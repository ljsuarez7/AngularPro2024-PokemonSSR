

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { SimplePokemon } from '../../interfaces';
import { provideRouter } from '@angular/router';

describe('PokemonListComponent', () => {

  let fixture: ComponentFixture<PokemonListComponent>;
  let compiled: HTMLElement;
  let component: PokemonListComponent;

  const mockPokemons: SimplePokemon[] = [
    {id: '1', name: 'bulbasaur'},
    {id: '2', name: 'ivysaur'},
  ]

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

  });

  it('should create the app', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render "No hay pokémon"', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();
    expect(compiled.querySelector('div')?.textContent).toContain('No hay pokémon');
  });

});
