import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import FavoriteRecipes from '../../pages/FavoriteRecipes';

const renderWithRouter = () => {
  return render(
    <MemoryRouter>
      <FavoriteRecipes />
    </MemoryRouter>,
  );
};

describe('Testes da tela de receitas favoritas', () => {
  test('Verifica se há um botão de filtro de comidas', () => {
    renderWithRouter();
    const buttonFood = screen.getByRole('button', { name: /food/i });
    expect(buttonFood).toBeInTheDocument();
  });
  test('Verifica se ao clicar no botão de filtro de comidas, apenas as comidas são exibidas', () => {
    renderWithRouter();
    const buttonFood = screen.getByRole('button', { name: /food/i });
    userEvent.click(buttonFood);
    const cardDrink = screen.queryByTestId(/recipe-card/i);
    expect(cardDrink).not.toBeInTheDocument();
  });
});
