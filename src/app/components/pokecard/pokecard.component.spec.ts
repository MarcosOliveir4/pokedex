import { fireEvent, render, screen } from '@testing-library/angular';
import { PipesModule } from '../../pipes/pipes.module';
import { PokecardComponent, PokeCardProps } from './pokecard.component';

const baseUrlSprite =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

const pokemonsDefault: PokeCardProps[] = [
  {
    name: 'Bulbasaur',
    type: 'grass',
    position: '1',
    img: `${baseUrlSprite}/1.png`,
  },
  {
    name: 'Charmander',
    type: 'fire',
    position: '4',
    img: `${baseUrlSprite}/4.png`,
  },
];

const sut = async (customProps?: Partial<PokecardComponent>) => {
  await render(PokecardComponent, {
    componentProperties: {
      pokemons: customProps?.pokemons || pokemonsDefault,
      ...customProps,
    },
    imports: [PipesModule],
  });
};

describe.each(Object.values(pokemonsDefault))(
  'PokeCard',
  ({ name, position, type, img }) => {
    const clicked = jest.fn();
    beforeEach(async () => {
      await sut({ pokemonClicked: { emit: clicked } as any });
    });

    it(`should render pokemon name: ${name}`, () => {
      expect(screen.getByText(name)).toBeTruthy();
    });

    it(`should emit pokemon ${name} when click pokecard`, () => {
      fireEvent.click(screen.getByTestId(`pokecarditem-${position}`));
      expect(clicked).toHaveBeenCalledWith({ name, position, type, img });
    });

    it(`should apply a class according to the type of pokemon ${name}`, () => {
      expect(
        screen
          .getByTestId(`pokecarditem-${position}`)
          .getElementsByClassName(type)
      ).toBeTruthy();
    });
  }
);
