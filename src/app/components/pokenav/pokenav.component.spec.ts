import { FormsModule } from '@angular/forms';
import { fireEvent, render, screen } from '@testing-library/angular';
import { PokenavComponent } from './pokenav.component';

const sut = async (customProps?: Partial<PokenavComponent>) => {
  await render(PokenavComponent, {
    imports: [FormsModule],
    componentProperties: {
      inputValue: customProps?.inputValue || '',
      ...customProps,
    },
  });
};

describe('PokeNav', () => {
  it('should display the correct text in the input field', async () => {
    await sut({ inputValue: 'Charmander' });
    const inputElement: any = screen.getByPlaceholderText('Buscar pokemon');
    expect(inputElement.value).toBe('Charmander');
  });

  it('should call the pokeInput event with the correct input value', async () => {
    const pokeInputSpy = jest.fn();
    await sut({
      pokeInput: { emit: pokeInputSpy } as any,
      inputValue: 'Charmander',
    });
    fireEvent.click(screen.getByTestId('pokeButtonBusca'));
    expect(pokeInputSpy).toHaveBeenCalledWith('Charmander');
  });

  it('should display the "Buscar" button as disabled when the loading prop is true', async () => {
    await sut({ loading: true });

    expect(screen.getByTestId('pokeButtonBusca')).toHaveProperty(
      'disabled',
      true
    );
  });
});
