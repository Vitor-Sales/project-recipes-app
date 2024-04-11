import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Recipe in progress tests', () => {
  const favBtn = 'favorite-btn';
  const route = '/meals/52771/in-progress';
  const finishBtnId = 'finish-recipe-btn';
  const mealName = 'Spicy Arrabiata Penne';
  const mealThumb = 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg';
  beforeEach(() => {
    const mockObj = {
      drinks: {
        178319: {
          strDrink: 'Aquamarine',
          strDrinkAlternate: null,
          strTags: null,
          strVideo: null,
          strCategory: 'Cocktail',
          strIBA: null,
          strAlcoholic: 'Alcoholic',
          strGlass: 'Martini Glass',
          strInstructions: 'Shake well in a shaker with ice.\r\nStrain in a martini glass.',
          strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
          strIngredient1: 'Hpnotiq',
          strIngredient2: 'Pineapple Juice',
          strIngredient3: 'Banana Liqueur',
        },
      },
      meals: {
        52771: {
          strMeal: mealName,
          strDrinkAlternate: null,
          strCategory: 'Vegetarian',
          strArea: 'Italian',
          strInstructions: 'Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes.\r\nIn a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped basil.\r\nDrain the pasta and add it to the sauce. Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.',
          strMealThumb: mealThumb,
          strTags: 'Pasta,Curry',
          strIngredient2: 'olive oil',
          strIngredient3: 'garlic',
          strIngredient4: 'chopped tomatoes',
          strIngredient5: 'red chile flakes',
          strIngredient6: 'italian seasoning',
          strIngredient7: 'basil',
          strIngredient8: 'Parmigiano-Reggiano',
        },
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(mockObj));
  });

  afterEach(() => { window.localStorage.clear(); });

  it('Rederiza a página de receita em progresso corretamente para alimentos', () => {
    renderWithRouter(<App />, { route });
    expect(screen.getByText(mealName)).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId(favBtn)).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(8);
    expect(screen.getByTestId(finishBtnId)).toBeInTheDocument();
  });
  it('Rederiza a página de receita em progresso corretamente para bebidas', () => {
    renderWithRouter(<App />, { route: '/drinks/178319/in-progress' });
    expect(screen.getByText('Aquamarine')).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId(favBtn)).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(3);
    expect(screen.getByTestId(finishBtnId)).toBeInTheDocument();
  });
  it('Pode marcar e desmarcar os ingredientes mudando sua decoração', async () => {
    renderWithRouter(<App />, { route });
    const label = screen.getByTestId('0-ingredient-step');
    const checkbox = screen.getAllByRole('checkbox')[0];
    expect(checkbox).not.toBeChecked();
    await checkbox.click();
    expect(checkbox).toBeChecked();
    expect(label).toHaveStyle('text-decoration: line-through solid rgb(0, 0, 0)');
    await checkbox.click();
    expect(checkbox).not.toBeChecked();
    expect(label).toHaveStyle('text-decoration: none');
  });
  it('Salva os checkboxes marcados no localStorage e os recupera ao atualizar a página', () => {
    const checkedIngredients = [
      'penne rigate',
      'olive oil',
      'garlic',
      'chopped tomatoes',
      'red chile flakes',
      'italian seasoning',
      'basil',
      'Parmigiano-Reggiano',
    ];
    renderWithRouter(<App />, { route });
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((checkbox) => {
      checkbox.click();
    });
    window.location.reload();
    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });
    let checkedIngredientsLocalStorage = JSON.parse(localStorage.getItem('checkedIngredients'));
    expect(checkedIngredientsLocalStorage).toEqual(checkedIngredients);
    checkboxes.forEach((checkbox) => {
      checkbox.click();
    });
    window.location.reload();
    checkboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
    checkedIngredientsLocalStorage = JSON.parse(localStorage.getItem('checkedIngredients'));
    expect(checkedIngredientsLocalStorage).toEqual([]);
  });
  it('O botao de finalizar fica disponível ao marcar todos os ingredientes, salva a receita e redireciona corretamente', async () => {
    renderWithRouter(<App />, { route });
    const checkboxes = screen.getAllByRole('checkbox');
    const finishBtn = screen.getByTestId(finishBtnId);
    expect(finishBtn).toBeDisabled();
    checkboxes.forEach((checkbox) => {
      checkbox.click();
    });
    expect(finishBtn).toBeEnabled();
    await finishBtn.click();
    expect(window.location.pathname).toBe('/done-recipes');
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const { doneDate } = doneRecipes[0];
    const expectedDoneRecipes = {
      id: '52771',
      nationality: 'Italian',
      name: mealName,
      category: 'Vegetarian',
      image: mealThumb,
      tags: [
        'Pasta',
        'Curry',
      ],
      alcoholicOrNot: '',
      type: 'meal',
      doneDate,
    };

    expect(doneRecipes[0]).toEqual(expectedDoneRecipes);
  });
  it('O botao de compartilhar copia o link para o clipboard e mostra Link copied!', async () => {
    renderWithRouter(<App />, { route });
    const shareBtn = screen.getByTestId('share-btn');
    await shareBtn.click();
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
    expect(navigator.clipboard.readText()).resolves.toBe('http://localhost:3000/meals/52771');
  });
  it('O botao de favoritar salva e remove a receita corretamente no localstorage', async () => {
    renderWithRouter(<App />, { route });
    const favoriteBtn = screen.getByTestId(favBtn);
    expect(favoriteBtn).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg?v=1');
    await favoriteBtn.click();
    expect(favoriteBtn).toHaveAttribute('src', '/src/images/blackHeartIcon.svg?v=1');
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const expectedFavoriteRecipes = {
      id: '52771',
      nationality: 'Italian',
      name: mealName,
      category: 'Vegetarian',
      image: mealThumb,
      alcoholicOrNot: '',
      type: 'meal',
    };
    expect(favoriteRecipes[0]).toEqual(expectedFavoriteRecipes);
    expect(favoriteRecipes).toHaveLength(1);
    await favoriteBtn.click();
    favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes).toHaveLength(0);
  });
});
