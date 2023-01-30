import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { PokeCardProps } from 'src/app/components/pokecard/pokecard.component';
import {
  DetalhePokemon,
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

  constructor(private pokeapiService: PokeapiService) {}
  public pokemon(pokemon: PokeCardProps) {
    console.log(pokemon);
  }

  public buscarPokemons() {
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
  private ordenarListagem({ name, id, types }: DetalhePokemon) {
    this.pokeCard.push({
      name,
      type: types[0].type.name,
      position: `${id}`,
      img: `${this.baseUrlImg}${id}.png`,
    });

    this.pokeCard.sort((p1, p2) => Number(p1.position) - Number(p2.position));
  }

  private listPokemonService(filterListPokemon: PokemonApiFilters) {
    this.pokeapiService
      .listPokemons(filterListPokemon)
      .pipe(
        map(({ results }) => results.map(({ name }) => name)),
        switchMap((nomes) =>
          nomes.map((nome) =>
            this.pokeapiService.detailPokemon(nome).subscribe((pokemon) => {
              this.ordenarListagem(pokemon);
            })
          )
        )
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.listPokemonService(this.filterListPokemon);
  }
}
