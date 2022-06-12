import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

describe('Teste do componente App.js ', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    const about = screen.getByRole('link', {
      name: /about/i,
    });
    const favorite = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página na URL / ao clicar no link Home',
    () => {
      const { history } = renderWithRouter(<App />);
      const home = screen.getByRole('link', {
        name: /home/i,
      });

      userEvent.click(home);
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });

  it(
    'Teste se a aplicação é vai para a página na URL /about ao clicar no link Home',
    () => {
      const { history } = renderWithRouter(<App />);
      const about = screen.getByRole('link', {
        name: /about/i });

      userEvent.click(about);
      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    },
  );

  it(
    'Teste se a aplicação é vai para a página na URL /about ao clicar no link Home',
    () => {
      const { history } = renderWithRouter(<App />);
      const favorites = screen.getByRole('link', {
        name: /favorite pokémons/i,
      });

      userEvent.click(favorites);
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    },
  );

  it(
    'Teste se a aplicação vai para a página Not Found ao entrar em uma URL desconhecida.',
    () => {
      const { history } = renderWithRouter(<App />);
      const url = '/abcd';

      history.push(url);

      const textInPage = screen.getByRole('heading', {
        name: /page requested not found/i,
      });

      expect(textInPage).toBeInTheDocument();
    },
  );
});
