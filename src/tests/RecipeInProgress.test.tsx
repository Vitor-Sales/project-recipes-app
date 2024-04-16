import { waitFor, screen } from '@testing-library/dom';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando Recipe in Progress', () => {
  const mealRoute = '/meals/52771/in-progress';
  const drinkRoute = '/drinks/178319/in-progress';
  const favoriteBtn = 'favorite-btn';
  const finishBtn = 'finish-recipe-btn';

  it('renderiza todos os elementos de uma refeição', async () => {
    const { getByTestId } = renderWithRouter(<App />, { route: mealRoute });
    expect(getByTestId('recipe-category')).toBeInTheDocument();
    expect(getByTestId('recipe-title')).toBeInTheDocument();
    expect(getByTestId('recipe-photo')).toBeInTheDocument();
    expect(getByTestId(favoriteBtn)).toBeInTheDocument();
    expect(getByTestId('share-btn')).toBeInTheDocument();
    await waitFor(() => {
      expect(getByTestId('0-ingredient-step')).toBeInTheDocument();
      expect(getByTestId('1-ingredient-step')).toBeInTheDocument();
      expect(getByTestId('2-ingredient-step')).toBeInTheDocument();
      expect(getByTestId('3-ingredient-step')).toBeInTheDocument();
      expect(getByTestId('4-ingredient-step')).toBeInTheDocument();
      expect(getByTestId('5-ingredient-step')).toBeInTheDocument();
      expect(getByTestId('6-ingredient-step')).toBeInTheDocument();
      expect(getByTestId('7-ingredient-step')).toBeInTheDocument();
    });
    expect(getByTestId(finishBtn)).toBeInTheDocument();
  });
  it('renderiza todos os elementos de uma bebida', async () => {
    const { getByTestId } = renderWithRouter(<App />, { route: drinkRoute });
    expect(getByTestId('recipe-category')).toBeInTheDocument();
    expect(getByTestId('recipe-title')).toBeInTheDocument();
    expect(getByTestId('recipe-photo')).toBeInTheDocument();
    expect(getByTestId('instructions')).toBeInTheDocument();
    expect(getByTestId(favoriteBtn)).toBeInTheDocument();
    expect(getByTestId('share-btn')).toBeInTheDocument();
    await waitFor(() => {
      expect(getByTestId('0-ingredient-step')).toBeInTheDocument();
      expect(getByTestId('1-ingredient-step')).toBeInTheDocument();
      expect(getByTestId('2-ingredient-step')).toBeInTheDocument();
    });
    expect(getByTestId(finishBtn)).toBeInTheDocument();
  });
  it('Testa a funcionalidade do botao de compartilhar receita', async () => {
    const { getByTestId, getByText } = renderWithRouter(<App />, { route: mealRoute });
    const shareBtn = getByTestId('share-btn');
    expect(shareBtn).toHaveAttribute('src', '/src/images/shareIcon.svg');
    await shareBtn.click();
    expect(getByText('Link copied!')).toBeInTheDocument();
  });
  it('Testa a funcionalidade do botao de favoritar receita', async () => {
    window.localStorage.clear();
    expect(localStorage).toHaveLength(0);
    const { getByTestId } = renderWithRouter(<App />, { route: mealRoute });
    const favBtn = getByTestId(favoriteBtn);
    expect(favBtn).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');
    await favBtn.click();
    await favBtn.click();
    await favBtn.click();
    expect(favBtn).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');
    expect(localStorage).toHaveLength(1);
  });
  it('Finaliza uma receita', async () => {
    renderWithRouter(<App />, { route: drinkRoute });
    const finishRecipeBtn = screen.getByTestId(finishBtn);
    expect(finishRecipeBtn).toBeDisabled();
    const checkboxes = await screen.findAllByRole('checkbox');
    await checkboxes[0].click();
    expect(checkboxes[0].parentElement).toHaveStyle('text-decoration: line-through solid rgb(0, 0, 0)');
    await checkboxes[0].click();
    expect(checkboxes[0].parentElement).toHaveStyle('text-decoration: none');
    await checkboxes[0].click();
    await checkboxes[1].click();
    await checkboxes[2].click();
    expect(finishRecipeBtn).not.toBeDisabled();
    await finishRecipeBtn.click();
    expect(window.location.pathname).toBe('/done-recipes');
  });
});
