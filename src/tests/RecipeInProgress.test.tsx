import { act, screen, waitFor } from '@testing-library/react';
import { it, vi } from 'vitest';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando fetch', () => {
  const route = '/meals/52771/in-progress';
  const mealName = 'Spicy Arrabiata Penne';
  const mealThumb = 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg';
  const favBtnId = 'favorite-btn';
  const blackIcon = '/src/images/blackHeartIcon.svg';
  const MOCK_RECIPE = {
    meals: [
      {
        idMeal: '52771',
        strMeal: 'Spicy Arrabiata Penne',
        strDrinkAlternate: null,
        strCategory: 'Vegetarian',
        strArea: 'Italian',
        strInstructions: 'Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes.\r\nIn a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped basil.\r\nDrain the pasta and add it to the sauce. Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        strTags: 'Pasta,Curry',
        strYoutube: 'https://www.youtube.com/watch?v=1IszT_guI08',
        strIngredient1: 'penne rigate',
        strIngredient2: 'olive oil',
        strIngredient3: 'garlic',
        strIngredient4: 'chopped tomatoes',
        strIngredient5: 'red chile flakes',
        strIngredient6: 'italian seasoning',
        strIngredient7: 'basil',
        strIngredient8: 'Parmigiano-Reggiano',
        strIngredient9: '',
        strIngredient10: '',
        strIngredient11: '',
        strIngredient12: '',
        strIngredient13: '',
        strIngredient14: '',
        strIngredient15: '',
        strIngredient16: null,
        strIngredient17: null,
        strIngredient18: null,
        strIngredient19: null,
        strIngredient20: null,
        strMeasure1: '1 pound',
        strMeasure2: '1/4 cup',
        strMeasure3: '3 cloves',
        strMeasure4: '1 tin ',
        strMeasure5: '1/2 teaspoon',
        strMeasure6: '1/2 teaspoon',
        strMeasure7: '6 leaves',
        strMeasure8: 'spinkling',
        strMeasure9: '',
        strMeasure10: '',
        strMeasure11: '',
        strMeasure12: '',
        strMeasure13: '',
        strMeasure14: '',
        strMeasure15: '',
        strMeasure16: null,
        strMeasure17: null,
        strMeasure18: null,
        strMeasure19: null,
        strMeasure20: null,
        strSource: null,
        strImageSource: null,
        strCreativeCommonsConfirmed: null,
        dateModified: null,
      },
    ],
  };
  const MOCK_RESPONSE = {
    ok: true,
    status: 200,
    json: async () => MOCK_RECIPE,
  } as Response;

  beforeEach(async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);
    await act(async () => {
      renderWithRouter(<App />, { route });
    });
    window.localStorage.clear();
  });

  afterEach(() => vi.clearAllMocks());

  it('Renderiza as informaçoes da receita', async () => {
    const recipeImage = await screen.findByTestId('recipe-photo');
    const recipeName = await screen.findByText(mealName);
    const recipeCategory = await screen.getByText(/vegetarian/i);
    const recipeInstructions = await screen.getByTestId('instructions');
    waitFor(() => {
      expect(recipeImage).not.toBeInTheDocument();
      expect(recipeImage).toHaveAttribute(
        'src',
        mealThumb,
      );
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(recipeName).toBeInTheDocument();
      expect(recipeCategory).toBeInTheDocument();
      expect(recipeInstructions).toBeInTheDocument();
    });
  });
  it('Renderiza os ingredientes da receita', async () => {
    const recipeIngredients = await screen.getAllByRole('checkbox');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(recipeIngredients).toHaveLength(8);
  });
  it('Renderiza os botões de ação', async () => {
    const shareBtn = await screen.getByTestId('share-btn');
    const favBtn = await screen.getByTestId(favBtnId);
    const finishBtn = await screen.getByTestId('finish-recipe-btn');
    expect(shareBtn).toBeInTheDocument();
    expect(favBtn).toBeInTheDocument();
    expect(finishBtn).toBeInTheDocument();
  });
  it('Testa a funcionalidade do botao de compartilhar receita', async () => {
    const shareBtn = await screen.getByTestId('share-btn');
    expect(shareBtn).toHaveAttribute('src', '/src/images/shareIcon.svg');
    await act(async () => {
      shareBtn.click();
      waitFor(() => {
        expect(screen.getByText('Link copied!')).toBeInTheDocument();
        expect(navigator.clipboard.readText()).resolves.toBe('http://localhost:3000/meals/52771');
      });
    });
  });
  it('Testa a funcionalidade do botao de favoritar receita', async () => {
    const favBtn = await screen.getByTestId(favBtnId);
    let favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipe') || '[]');
    expect(favoritesRecipes).toHaveLength(0);
    expect(favBtn).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');
    const expectedFavoriteRecipes = {
      id: '52771',
      nationality: 'Italian',
      name: mealName,
      category: 'Vegetarian',
      image: mealThumb,
      alcoholicOrNot: '',
      type: 'meal',
    };
    await act(async () => {
      favBtn.click();
      waitFor(() => {
        expect(favBtn).toHaveAttribute('src', blackIcon);
        favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipe') || '[]');
        expect(favoritesRecipes).toHaveLength(1);
        expect(favoritesRecipes[0]).toEqual(expectedFavoriteRecipes);
      });
    });
  });
  it('Testa a funcionalidade de marcar e desmamcar ingredientes, mudando sua decoração', async () => {
    const label = await screen.getByTestId('0-ingredient-step');
    const checkbox = await screen.getAllByRole('checkbox')[0];
    await act(async () => {
      checkbox.click();
      expect(checkbox).toBeChecked();
      expect(label).toHaveStyle('text-decoration: line-through solid rgb(0, 0, 0)');
      checkbox.click();
      expect(checkbox).not.toBeChecked();
      expect(label).toHaveStyle('text-decoration: none');
    });
  });
  it('Testa se as informacoes de favoritos e ingredientes marcados são mantidos ao atualizar a página', async () => {
    const checkboxes = await screen.getAllByRole('checkbox');
    const favBtn = await screen.getByTestId(favBtnId);
    checkboxes.forEach((checkbox) => {
      checkbox.click();
    });
    favBtn.click();
    await waitFor(() => {
      expect(favBtn).toHaveAttribute('src', blackIcon);
    });
    window.location.reload();
    await waitFor(() => {
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toBeChecked();
      });
      expect(favBtn).toHaveAttribute('src', blackIcon);
    });
  });
  it('Testa a funcionalidade do botao de finalizar receita', async () => {
    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishBtn).toBeDisabled();
    const checkboxes = await screen.getAllByRole('checkbox');
    checkboxes.forEach((checkbox) => {
      checkbox.click();
    });
  });
});
