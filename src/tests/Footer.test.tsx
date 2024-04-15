import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Footer from '../components/Footer';

const ROTA_MEALS = '/meals';
const ROTA_DRINKS = '/drinks';
const ROTA_PROFILE = '/profile';
const ROTA_DONE_RECIPES = '/done-recipes';
const ROTA_FAVORITE_RECIPES = '/favorite-recipes';

const botaoDrinksId = 'drinks-bottom-btn';
const botaoMealssId = 'meals-bottom-btn';
const botaoProfileId = 'profile-bottom-btn';
const botaoDoneId = 'done-recipes-btn';
const botaoFavoriteId = 'favorite-recipes-btn';

describe('Componente de Cabeçalho Header (com pesquisa) ', () => {
  it('Redireciona para a página de Drinks quando o botão Drinks', async () => {
    const { getByTestId } = renderWithRouter(<Footer />);
    const botaoDrinks = getByTestId(botaoDrinksId);
    fireEvent.click(botaoDrinks);
    waitFor(() => expect(global.window.location.pathname).toEqual(ROTA_DRINKS));
  });

  it('Redireciona para a página de Drinks quando o botão Drinks', async () => {
    const { getByTestId } = renderWithRouter(<Footer />);
    const botaoMealss = getByTestId(botaoMealssId);
    fireEvent.click(botaoMealss);
    waitFor(() => expect(global.window.location.pathname).toEqual(ROTA_MEALS));
  });

  // Esxtras por causa do Design novo
  it('Redireciona para a página de Profile', async () => {
    const { getByTestId } = renderWithRouter(<Footer />);
    const botaoProfile = getByTestId(botaoProfileId);
    fireEvent.click(botaoProfile);
    waitFor(() => expect(global.window.location.pathname).toEqual(ROTA_PROFILE));
  });

  it('Redireciona para a página de Done', async () => {
    const { getByTestId } = renderWithRouter(<Footer />);
    const botaoDone = getByTestId(botaoDoneId);
    fireEvent.click(botaoDone);
    waitFor(() => expect(global.window.location.pathname).toEqual(ROTA_DONE_RECIPES));
  });

  it('Redireciona para a página de Favorite', async () => {
    const { getByTestId } = renderWithRouter(<Footer />);
    const botaoFavorite = getByTestId(botaoFavoriteId);
    fireEvent.click(botaoFavorite);
    waitFor(() => expect(global.window.location.pathname).toEqual(ROTA_FAVORITE_RECIPES));
  });
});
