import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Footer from '../components/Footer';

const ROTA_MEALS = '/meals';
const ROTA_DRINKS = '/drinks';
const botaoDrinksId = 'drinks-bottom-btn';
const botaoMealssId = 'meals-bottom-btn';

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
});
