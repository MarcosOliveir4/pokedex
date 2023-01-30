import { Component, EventEmitter, Input, Output } from '@angular/core';

type PokeTypes =
  | 'fire'
  | 'water'
  | 'grass'
  | 'flying'
  | 'fighting'
  | 'poison'
  | 'electric'
  | 'ground'
  | 'rock'
  | 'psychic'
  | 'ice'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'dragon'
  | 'dark'
  | 'fairy'
  | 'normal';

export interface PokeCardProps {
  name: string;
  type: PokeTypes | string;
  position: string;
  img: string;
}

@Component({
  selector: 'app-pokecard',
  templateUrl: 'pokecard.component.html',
  styleUrls: ['pokecard.component.scss', 'pokecard-types.scss'],
})
export class PokecardComponent {
  @Input() pokemons!: PokeCardProps[];
  @Output() pokemonClicked = new EventEmitter<PokeCardProps>();

  public clicked(pokemon: PokeCardProps) {
    this.pokemonClicked.emit(pokemon);
  }
}
