import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PokeapiService } from './pokeapi.service';
import { PokemonDetalhe } from './mockResponseService';

describe('PokeapiService', () => {
  let service: PokeapiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokeapiService],
    });
    service = TestBed.inject(PokeapiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should list pokemons', () => {
    const mockResponse = {
      count: 9,
      next: 'https://pokeapi.co/api/v2/pokemon?offset=9&limit=9',
      previous: null,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2' },
        { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3' },
      ],
    };

    service.listPokemons().subscribe((pokemons) => {
      expect(pokemons).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon?limit=9&offset=0`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
  it('should detail pokemon', () => {
    service.detailPokemon('charmander').subscribe((pokemon) => {
      expect(pokemon).toEqual(PokemonDetalhe);
    });
    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/charmander`
    );
    expect(req.request.method).toBe('GET');
    req.flush(PokemonDetalhe);
  });

  it('should filter pokemon', () => {
    const mockResponse = {
      count: 9,
      next: 'https://pokeapi.co/api/v2/pokemon?offset=9&limit=9',
      previous: null,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1' },
      ],
    };

    service.filterPokemons('bulbasaur').subscribe((pokemons) => {
      expect(pokemons).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon?limit=-1`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
