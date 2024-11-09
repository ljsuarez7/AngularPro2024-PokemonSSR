import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemon-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {


  public pokemonsService = inject(PokemonsService);
  public route = inject(ActivatedRoute);

  public pokemon = signal<Pokemon | null>(null);

  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.pokemonsService.loadPokemon(id)
      .pipe(
        tap(
          ({name, id}) => {

            const pageTitle = `#${id} - ${name}`;
            const pageDescription = `Página del Pokémon ${name}`;
            const pageImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

            this.title.setTitle(pageTitle);
            this.meta.updateTag({name: 'description', content: pageDescription});
            this.meta.updateTag({name: 'og:title', content: pageTitle});
            this.meta.updateTag({name: 'og:description', content: pageDescription});
            this.meta.updateTag({name: 'og:image', content: pageImage});

          }
        )
      )
      .subscribe(this.pokemon.set);

  }

}
