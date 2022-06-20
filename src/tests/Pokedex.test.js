import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  it('Testa se texto "Encountered pokémons" é mostrado',
    () => {
      renderWithRouter(<App />);
      const head = screen.getByRole('heading', {
        level: 2,
        name: /Encountered pokémons/i,
      });
      expect(head).toBeInTheDocument();
    });

  it('Teste se é exibido o próximo pokémon da lista quando o botão é clicado',
    () => {
      renderWithRouter(<App />);
      const button = screen.getByRole('button', {
        name: 'Próximo pokémon',
      });
      pokemons.forEach(({ name }) => {
        expect(screen.getByText(name)).toBeInTheDocument();
        userEvent.click(button);
      });
    });

  it('Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const item = screen.getByText(pokemons[0].name);
    expect(item).toBeInTheDocument();
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const filterButtons = screen.getAllByTestId('pokemon-type-button');

    filterButtons.forEach((button) => {
      expect(button).toBeInTheDocument();
      const btn = screen.getByRole('button', { name: button.textContent });
      userEvent.click(btn);

      const name = screen.getByTestId('pokemon-name');
      const type = screen.getByTestId('pokemon-type');
      const next = screen.getByTestId('next-pokemon');

      const getPokemonsByType = pokemons.filter((pokemon) => (
        pokemon.type === button.textContent
      ));

      getPokemonsByType.forEach((pokemon) => {
        expect(pokemon.type).toEqual(button.textContent);
        expect(type.textContent).toEqual(pokemon.type);
        expect(name.textContent).toEqual(pokemon.name);
        userEvent.click(next);
      });
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
  });
});
