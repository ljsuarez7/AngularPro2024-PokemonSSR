import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, input } from '@angular/core';
import { SimplePokemon } from '../../interfaces';

@Component({
  selector: 'pokemon-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './pokemon-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {

  public pokemon = input.required<SimplePokemon>();
  public readonly pokemonImage = computed(
    () => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`
  )

  // logEffect = effect(() => {
  //   console.log('Pokemon en PokemonCardComponent: ', this.pokemon());
  // })

}
