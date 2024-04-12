import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Recipes from '../pages/Recipes';

describe('Componente Recipes', () => {
  const testPath = (path: string) => {
    it(`Renderiza os botões de categorias e receitas para ${path}`, async () => {
      const { findAllByTestId } = renderWithRouter(<Recipes />, { route: path });

      const categoryButtons = await findAllByTestId(/-category-filter$/);
      expect(categoryButtons.length).toBeGreaterThan(0);

      fireEvent.click(categoryButtons[0]);

      const recipeCards = await findAllByTestId(/-recipe-card$/);
      expect(recipeCards.length).toBeGreaterThan(0);
    });
  };

  testPath('/meals');

  testPath('/drinks');
});
