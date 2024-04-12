import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RecipeInProgress() {
  const [recipeType, setRecipeType] = useState<string>('');
  const [recipeId, setRecipeId] = useState<string>('');
  const [recipe, setRecipe] = useState<any>({});
  const [isFinishBtnDisabled, setIsFinishBtnDisabled] = useState<boolean>(true);
  const [isLinkCopied, setLinkCopied] = useState<boolean>(false);
  const [isRecipeFavorited, setIsRecipeFavorited] = useState<boolean>();
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const inputCheckbox = 'input[type="checkbox"]';

  const fetchRecipe = async (type: string, id: string) => {
    let apiUrl;
    if (type === 'meals') {
      apiUrl = 'www.themealdb.com';
    } else if (type === 'drinks') {
      apiUrl = 'www.thecocktaildb.com';
    }
    try {
      const response = await fetch(`https://${apiUrl}/api/json/v1/1/lookup.php?i=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipe data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching recipe:', error);
      throw error;
    }
  };

  const getRecipeInfo = async () => {
    const path = window.location.pathname;
    const regex = /\/(meals|drinks)\/(\d+)\/in-progress/;
    const match = path.match(regex);
    if (match) {
      const [, type, id] = match;
      const recipeData = await fetchRecipe(type, id);
      setRecipe(recipeData[type][0]);
      setRecipeType(type);
      setRecipeId(id);
    }
    const storedCheckedIngredients = localStorage.getItem('checkedIngredients');
    if (storedCheckedIngredients) {
      setCheckedIngredients(new Set(JSON.parse(storedCheckedIngredients)));
    }
  };

  useEffect(() => {
    const checkboxes = document.querySelectorAll(inputCheckbox);
    checkboxes.forEach((checkbox: any) => {
      const ingredientName = checkbox.parentNode.textContent.trim();
      if (checkedIngredients.has(ingredientName)) {
        checkbox.checked = true;
      }
    });
  }, [recipe]);

  useEffect(() => {
    getRecipeInfo();
    const checkboxes = document.querySelectorAll(inputCheckbox);
    checkboxes.forEach((checkbox: any) => {
      const ingredientName = checkbox.parentNode.textContent.trim();
      if (checkedIngredients.has(ingredientName)) {
        checkbox.checked = true;
      }
    });
  }, []);

  useEffect(() => {
    const initialFavorite = () => {
      const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
      const isInStorage = favoriteStorage.some((item: any) => {
        return item.id === recipeId;
      });
      if (isInStorage) {
        setIsRecipeFavorited(true);
      }
    };
    initialFavorite();
  }, [recipeId]);

  const renderIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredientKey = `strIngredient${i}` as keyof typeof recipe;
      const ingredientValue = recipe[ingredientKey];
      if (ingredientValue) {
        const isChecked = checkedIngredients.has(ingredientValue);
        ingredients.push({ name: ingredientValue, checked: isChecked });
      }
    }
    return ingredients.map((ingredient, index) => {
      return (
        <label key={ index } data-testid={ `${index}-ingredient-step` }>
          <input
            type="checkbox"
            onChange={ (event) => toggleTextDecoration(event.target) }
          />
          {ingredient.name}
        </label>
      );
    });
  };

  function toggleTextDecoration(checkbox: any) {
    const isChecked = checkbox?.checked;
    const ingredientText = checkbox?.parentNode as HTMLElement;
    const ingredientName = ingredientText.textContent?.trim() || '';
    if (isChecked) {
      ingredientText.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
    } else {
      ingredientText.style.textDecoration = 'none';
    }
    updateCheckedIngredients(ingredientName, isChecked);
    const checkboxes = document.querySelectorAll(inputCheckbox);
    let allIngredientsChecked = true;
    checkboxes.forEach((input: any) => {
      if (!input.checked) {
        allIngredientsChecked = false;
      }
    });
    if (allIngredientsChecked) {
      setIsFinishBtnDisabled(false);
    }
    if (!isChecked) {
      setIsFinishBtnDisabled(true);
    }
  }

  const finishRecipe = () => {
    const type = recipeType.slice(0, -1);
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const doneRecipe = {
      id: recipeId,
      nationality: recipe.strArea || '',
      name: recipe.strMeal || recipe.strDrink,
      category: recipe.strCategory,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
      tags: recipe.strTags ? recipe.strTags.split(',') : [],
      alcoholicOrNot: recipe.strAlcoholic || '',
      type,
      doneDate: new Date().toISOString(),
    };
    doneRecipes.push(doneRecipe);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    navigate('/done-recipes');
  };

  const shareRecipe = async () => {
    setLinkCopied(true);
    await navigator.clipboard.writeText(`http://localhost:3000/${recipeType}/${recipeId}`);
  };

  const favoriteRecipe = (prevState: boolean) => {
    const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const isInStorage = favoriteStorage
      .some(({ id: itemId }: { id: string }) => itemId === recipeId);
    if (!isInStorage) {
      const type = recipeType.slice(0, -1);
      const favRecipe = {
        id: recipeId,
        nationality: recipe.strArea || '',
        name: recipe.strMeal || recipe.strDrink,
        category: recipe.strCategory,
        image: recipe.strMealThumb || recipe.strDrinkThumb,
        alcoholicOrNot: recipe.strAlcoholic || '',
        type,
      };
      favoriteStorage.push(favRecipe);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteStorage));
      setIsRecipeFavorited(!prevState);
    } else {
      const newFavorites = favoriteStorage
        .filter(({ id: itemId }: { id: string }) => itemId !== recipeId);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setIsRecipeFavorited(!prevState);
    }
  };

  const updateCheckedIngredients = (ingredient: string, isChecked: boolean) => {
    const newCheckedIngredients = new Set(checkedIngredients);
    if (isChecked) {
      newCheckedIngredients.add(ingredient);
    } else {
      newCheckedIngredients.delete(ingredient);
    }
    setCheckedIngredients(newCheckedIngredients);
    localStorage
      .setItem('checkedIngredients', JSON.stringify(Array.from(newCheckedIngredients)));
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipeType === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
        alt={ `Uma foto de ${recipeType === 'meals' ? recipe.strMeal : recipe.strDrink}` }
      />
      <h2 data-testid="recipe-title">
        {recipeType === 'meals'
          ? recipe.strMeal : recipe.strDrink}
      </h2>
      <button onClick={ shareRecipe }>
        <img
          data-testid="share-btn"
          src="/src/images/shareIcon.svg"
          alt="share button"
        />
      </button>
      <button onClick={ () => favoriteRecipe(isRecipeFavorited) }>
        <img
          data-testid="favorite-btn"
          src={ isRecipeFavorited ? '/src/images/blackHeartIcon.svg'
            : '/src/images/whiteHeartIcon.svg' }
          alt="favorite button"
        />
      </button>

      { isLinkCopied && <p>Link copied!</p> }
      <h4 data-testid="recipe-category">{recipe.strCategory}</h4>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      {renderIngredients()}
      <button
        data-testid="finish-recipe-btn"
        disabled={ isFinishBtnDisabled }
        onClick={ () => finishRecipe() }
      >
        Finalizar
      </button>
    </div>
  );
}

export default RecipeInProgress;
