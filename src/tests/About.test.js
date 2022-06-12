import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import { About } from '../pages';

describe('Testando o componente <About.js />', () => {
  it('Teste se a página contém o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const head = screen.getByRole('heading', {
      name: /about pokédex/i,
    });
    expect(head).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos', () => {
    renderWithRouter(<About />);
    const paragraphs = document.getElementsByTagName('p');

    expect(paragraphs).toHaveLength(2);
  });

  it('Teste se a página contém a imágem da Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexImg = screen.getByRole('img');
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(pokedexImg.src).toBe(url);
  });
});
