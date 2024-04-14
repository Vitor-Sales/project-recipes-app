import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Profile from '../pages/Profile';

const ROTA_DONE = '/done-recipes';
const ROTA_FAVORITE = '/favorite-recipes';
const ROTA_LOGOUT = '/';

const botaoDoneId = 'profile-done-btn';
const botaoFavoriteId = 'profile-favorite-btn';
const botaoLogoutId = 'profile-logout-btn';

describe('Realiza teste do contudo da pagina Logout:', () => {
  it('Redireciona para a página de Done Recipes quando o Done Recipes é clicado', async () => {
    const { getByTestId } = renderWithRouter(<Profile />);
    const botaoDone = getByTestId(botaoDoneId);
    fireEvent.click(botaoDone);
    waitFor(() => expect(global.window.location.pathname).toEqual(ROTA_DONE));
  });

  it('Redireciona para a página de Favorite Recipes quando o Favorite Recipes é clicado', async () => {
    const { getByTestId } = renderWithRouter(<Profile />);
    const botaoFavorite = getByTestId(botaoFavoriteId);
    fireEvent.click(botaoFavorite);
    waitFor(() => expect(global.window.location.pathname).toEqual(ROTA_FAVORITE));
  });

  it('Redireciona para a página inicial de login quando o Logout é clicado', async () => {
    const { getByTestId } = renderWithRouter(<Profile />);
    const botaoLogout = getByTestId(botaoLogoutId);
    fireEvent.click(botaoLogout);
    waitFor(() => expect(global.window.location.pathname).toEqual(ROTA_LOGOUT));
  });

  it('Redireciona para a página cover About é clicado', async () => {
    const { getByTestId } = renderWithRouter(<Profile />);
    const botaoAbout = getByTestId('About-btn');
    fireEvent.click(botaoAbout);
    waitFor(() => expect(global.window.location.pathname).toEqual('/about-us'));
  });

  it('Quando o botão de logout é clicado, localStorage.clear() é chamado', async () => {
    // Armazena um usuário fictício no localStorage
    const fakeUser = { email: 'example@example.com' };
    localStorage.setItem('user', JSON.stringify(fakeUser));
    const { getByTestId } = renderWithRouter(<Profile />);

    // Substitui localStorage.clear() por uma função fictícia
    const clearSpy = vi.spyOn(window.localStorage, 'clear');

    // Renderiza o componente Header
    const botaoLogout = getByTestId(botaoLogoutId);

    // Verifica se a chave 'user' está presente no localStorage
    expect(localStorage.getItem('user')).not.toBeNull();

    // Simula o clique no botão de logout
    await userEvent.click(botaoLogout);

    // Verifica se a chave 'user' ainda está presente no localStorage
    expect(localStorage.getItem('user')).toBeNull();

    // Restaura a função original de localStorage.clear() após o teste
    clearSpy.mockRestore();
  });
});
