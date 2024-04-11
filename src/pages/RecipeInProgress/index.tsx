/* eslint-disable max-lines */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line sonarjs/cognitive-complexity
function RecipeInProgress() {
  const [recipeType, setRecipeType] = useState<string>('');
  const [recipeId, setRecipeId] = useState<string>('');
  const [recipe, setRecipe] = useState<any>({});
  const [isFinishBtnDisabled, setIsFinishBtnDisabled] = useState<boolean>(true);
  const [isLinkCopied, setLinkCopied] = useState<boolean>(false);
  const [isRecipeFavorited, setIsRecipeFavorited] = useState<boolean>();
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  // remove mock later
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
        strInstructionsES: 'Agite bien en una coctelera con hielo. Cuela en una copa de Martini.',
        strInstructionsDE: null,
        strInstructionsFR: null,
        strInstructionsIT: 'Shakerare bene in uno shaker con ghiaccio.\r\nFiltrare in una coppetta Martini.',
        'strInstructionsZH-HANS': null,
        'strInstructionsZH-HANT': null,
        strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        strIngredient1: 'Hpnotiq',
        strIngredient2: 'Pineapple Juice',
        strIngredient3: 'Banana Liqueur',
        strIngredient4: null,
        strIngredient5: null,
        strIngredient6: null,
        strIngredient7: null,
        strIngredient8: null,
        strIngredient9: null,
        strIngredient10: null,
        strIngredient11: null,
        strIngredient12: null,
        strIngredient13: null,
        strIngredient14: null,
        strIngredient15: null,
        strMeasure1: '2 oz',
        strMeasure2: '1 oz',
        strMeasure3: '1 oz',
        strMeasure4: '',
        strMeasure5: '',
        strMeasure6: '',
        strMeasure7: '',
        strMeasure8: null,
        strMeasure9: null,
        strMeasure10: null,
        strMeasure11: null,
        strMeasure12: null,
        strMeasure13: null,
        strMeasure14: null,
        strMeasure15: null,
        strImageSource: null,
        strImageAttribution: null,
        strCreativeCommonsConfirmed: 'No',
        dateModified: null,
      },
    },
    meals: {
      52771: {
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
    },
  };

  const setUpData = () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(mockObj));
  };

  const getRecipeInfo = () => {
    // get the type from the url
    const path = window.location.pathname;
    const regex = /\/(meals|drinks)\/(\d+)\/in-progress/;
    const match = path.match(regex);
    if (match) {
      const [, type, id] = match;
      // get the recipe info from localstorage
      const storedDataString = localStorage.getItem('inProgressRecipes');
      setRecipeType(type);
      if (storedDataString) {
        const storedData = JSON.parse(storedDataString);
        setRecipe(storedData[type][id]);
        setRecipeId(id);
      }
    }
    // get the checked ingredients from localstorage
    const storedCheckedIngredients = localStorage.getItem('checkedIngredients');
    if (storedCheckedIngredients) {
      setCheckedIngredients(new Set(JSON.parse(storedCheckedIngredients)));
    }
  };

  useEffect(() => {
    // Update checked status of checkboxes after recipe state is set
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox: any) => {
      const ingredientName = checkbox.parentNode.textContent.trim();
      if (checkedIngredients.has(ingredientName)) {
        checkbox.checked = true;
      }
    });
  }, [recipe]);

  useEffect(() => {
    // set up mock data
    // can be removed later
    setUpData();

    // get recipe info from localstorage
    getRecipeInfo();
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
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

  // function to iterate ingredients and render them
  const renderIngredients = () => {
    const ingredients = [];
    // iterate over the ingredients on api reponse
    for (let i = 1; i <= 20; i++) {
      const ingredientKey = `strIngredient${i}` as keyof typeof recipe;
      const ingredientValue = recipe[ingredientKey];
      if (ingredientValue) {
        const isChecked = checkedIngredients.has(ingredientValue); // Check if ingredient is checked
        ingredients.push({ name: ingredientValue, checked: isChecked });
      }
    }
    // render the ingredients checkboxes
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

  // function to change the checked ingredient decoration and turn the finish btn able
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
    // check if all ingredients are checked
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let allIngredientsChecked = true;
    checkboxes.forEach((input: any) => {
      if (!input.checked) {
        allIngredientsChecked = false;
      }
    });
    // enable finish button if all ingredients are checked
    if (allIngredientsChecked) {
      setIsFinishBtnDisabled(false);
    }
    // disable finish button if any ingredient is unchecked
    if (!isChecked) {
      setIsFinishBtnDisabled(true);
    }
  }

  // function to save recipe finished and redirect
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

  // copy the url to the clipboard and show the Link copied on screen
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

  // Function to update checked ingredients
  const updateCheckedIngredients = (ingredient: string, isChecked: boolean) => {
    const newCheckedIngredients = new Set(checkedIngredients);
    if (isChecked) {
      newCheckedIngredients.add(ingredient);
    } else {
      newCheckedIngredients.delete(ingredient);
    }
    setCheckedIngredients(newCheckedIngredients);
    // Save checked ingredients to local storage
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
          src={ isRecipeFavorited ? '/src/images/blackHeartIcon.svg?v=1'
            : '/src/images/whiteHeartIcon.svg?v=1' }
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
        onClick={ finishRecipe }
      >
        Finalizar
      </button>
    </div>
  );
}

export default RecipeInProgress;
