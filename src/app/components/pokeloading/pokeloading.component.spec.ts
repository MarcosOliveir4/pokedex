import { render, screen } from '@testing-library/angular';
import { pokeloadingComponent } from './pokeloading.component';

const sut = async () => {
  await render(pokeloadingComponent);
};

describe('PokeLoading', () => {
  it('should render Pokeloading', async () => {
    await sut();
    expect(screen.getByTestId('pokeloading')).toBeTruthy();
  });
  it('should render with the correct class', async () => {
    await sut();
    expect(screen.getByTestId('pokeloading').className).toBe('pokeloading');
  });
});
