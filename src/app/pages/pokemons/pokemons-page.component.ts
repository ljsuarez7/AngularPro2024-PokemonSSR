import { ApplicationRef, ChangeDetectionStrategy, Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent {

  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private title = inject(Title);

  //Versión con query parameters http://localhost:4200/pokemons?page=1
  // public currentPage = toSignal<number>(
  //   this.route.queryParamMap.pipe(
  //     map((params) => params.get('page') ?? '1'),
  //     map((page) => (isNaN(+page) ? 1 : +page)),
  //     map((page) => Math.max(1, page)),
  //   )
  // );

  //Versión con segmento de pagina http://localhost:4200/pokemons/page/1
  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map((params) => params['page'] ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page)),
    )
  );

  public loadOnPageChanged = effect(() => {
    this.loadPokemons(this.currentPage());
  },
  {
    allowSignalWrites: true
  });

  // public isLoading = signal(true);

  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe(isStable => {
  //   console.log({ isStable });
  // });

  // ngOnInit(): void {

  //   this.loadPokemons();
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 5000);
  // }

  //Versión con query parameters http://localhost:4200/pokemons?page=1
  // public loadPokemons(page = 0) {

  //   const pageToLoad = this.currentPage()! + page;

  //   this.pokemonsService.loadPage(pageToLoad)
  //     .pipe(
  //       tap(() => this.router.navigate([], { queryParams: { page: pageToLoad } })),
  //       tap(() => this.title.setTitle(`PokemonSsr - Page ${pageToLoad}`)),
  //     )
  //     .subscribe(pokemons => {
  //       this.pokemons.set(pokemons);
  //     });

  // }

  //Versión con segmento de pagina http://localhost:4200/pokemons/page/1
  public loadPokemons(page = 0) {

    this.pokemonsService.loadPage(page)
      .pipe(
        tap(() => this.title.setTitle(`PokemonSsr - Page ${page}`)),
      )
      .subscribe(pokemons => {
        this.pokemons.set(pokemons);
      });

  }

  // ngOnDestroy(): void {
  //   this.$appState.unsubscribe();
  // }

}
