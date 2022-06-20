import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../RenderWithRouter';

describe('Testando componente NotFound.js', () => {
  it('Teste se a página contém um h2 com o texto Page not found', () => {
    renderWithRouter(<NotFound />);
    const h2 = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });

    expect(h2).toBeInTheDocument();
  });

  it('Teste se a página mostra a imagem com a url', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(img).toHaveProperty('src', url);
  });
});
