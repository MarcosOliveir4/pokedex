import { Component, OnInit } from '@angular/core';
import { concatMap, finalize, from, map, mergeMap, toArray } from 'rxjs';
import { PokeCardProps } from 'src/app/components/pokecard/pokecard.component';
import {
  PokeapiService,
  PokemonApiFilters,
} from 'src/app/services/pokeapi.service';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {
  public pokeCard: PokeCardProps[] = [];
  private baseUrlImg = environment.baseUrlImage;
  private filterListPokemon: PokemonApiFilters = { limit: 15, offset: 0 };
  public isLoading = true;

  constructor(private pokeapiService: PokeapiService) {}
  public pokemon(pokemon: PokeCardProps) {
    console.log(pokemon);
  }

  public buscarPokemons() {
    this.isLoading = true;
    this.listPokemonService(this.resolverFilter(this.filterListPokemon));
  }
  private resolverFilter(filter: PokemonApiFilters): PokemonApiFilters {
    if (filter.offset && filter.limit) {
      filter.offset = filter.offset + filter.limit;
      return filter;
    }
    filter.offset = this.filterListPokemon.limit;
    return filter;
  }

  private listPokemonService(filterListPokemon: PokemonApiFilters) {
    this.pokeapiService
      .listPokemons(filterListPokemon)
      .pipe(
        map(({ results }) => results.map(({ name }) => name)),
        mergeMap((nomes) =>
          from(nomes).pipe(
            concatMap((nome) => this.pokeapiService.detailPokemon(nome))
          )
        ),
        toArray(),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((pokemons) => {
        pokemons.forEach((pokemon) => {
          this.pokeCard.push({
            name: pokemon.name,
            type: pokemon.types[0].type.name,
            position: `${pokemon.id}`,
            img: `${this.baseUrlImg}${pokemon.id}.png`,
          });
        });
      });
  }

  ngOnInit(): void {
    this.listPokemonService(this.filterListPokemon);
  }
}
