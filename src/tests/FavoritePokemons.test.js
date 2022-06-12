import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import { FavoritePokemons } from '../pages';
import { readFavoritePokemonIds } from '../services/pokedexService';

describe('Testando o componente FavoritePokemons', () => {
  it('Teste se é exibida a mensagem se nenhum pokemon é favoritado', () => {
    renderWithRouter(<FavoritePokemons />);
    const msg = screen.getByText(/No favorite pokemon found/i);
    expect(msg).toBeInTheDocument();
  });

  it('Teste se são exibidos todos os cards favoritados', () => {
    renderWithRouter(<FavoritePokemons />);
    const favorites = readFavoritePokemonIds();
    expect(favorites).toHaveLength(favorites.length);
  });
});
