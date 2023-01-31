import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, debounceTime } from 'rxjs';

type PokemonList = {
  name: string;
  url: string;
};
type Ability = {
  name: string;
  url: string;
};
type Abilities = {
  ability: Ability;
};
type Types = {
  slot: number;
  type: { name: string; url: string };
};
export interface ListPokemons {
  count: number;
  next?: string;
  previous?: string;
  results: PokemonList[];
}

export interface DetalhePokemon {
  abilities: Abilities[];
  base_experience: number;
  height: number;
  id: number;
  is_default: boolean;
  name: string;
  types: Types[];
  weight: number;
}
export interface PokemonApiFilters {
  limit?: number;
  offset?: number;
  next?: string;
  previous?: string;
}

@Injectable()
export class PokeapiService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  constructor(private http: HttpClient) {}

  public listPokemons(
    filters: PokemonApiFilters = { limit: 9, offset: 0 }
  ): Observable<ListPokemons> {
    return this.http.get<ListPokemons>(this.baseUrl, {
      params: { ...filters },
    });
  }

  public detailPokemon(namePokemon: string): Observable<DetalhePokemon> {
    return this.http.get<DetalhePokemon>(`${this.baseUrl}/${namePokemon}`);
  }

  public filterPokemons(term: string): Observable<PokemonList[]> {
    return this.http
      .get<ListPokemons>(`${this.baseUrl}`, { params: { limit: -1 } })
      .pipe(
        debounceTime(5000),
        map(({ results }) =>
          results.filter((pokemon) => pokemon.name.indexOf(term) !== -1)
        )
      );
  }
}
