import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Meal, Drink } from '../../types';

function isMeal(recipe: Meal | Drink): recipe is Meal {
  return (recipe as Meal).idMeal !== undefined;
}

function Recipes() {
  const [recipes, setRecipes] = useState<Array<Meal | Drink>>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    const isMealPath = location.pathname.includes('/meals');
    const recipesUrl = isMealPath
      ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
      : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const categoriesUrl = isMealPath
      ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
      : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

    const fetchRecipes = async () => {
      const response = await fetch(recipesUrl);
      const data = await response.json();
      setRecipes(isMealPath ? data.meals : data.drinks);
    };

    const fetchCategories = async () => {
      const response = await fetch(categoriesUrl);
      const data = await response.json();
      const fetchedCategories = isMealPath ? data.meals : data.drinks;
      setCategories(fetchedCategories.map((cat:
      { strCategory: string }) => cat.strCategory).slice(0, 5));
    };

    fetchRecipes();
    fetchCategories();
  }, [location.pathname]);

  return (
    <div>
      {categories.map((category) => (
        <button key={ category } data-testid={ `${category}-category-filter` }>
          {category}
        </button>
      ))}
      {recipes.map((recipe, index) => (
        <div
          key={ isMeal(recipe)
            ? recipe.idMeal : recipe.idDrink }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ isMeal(recipe) ? recipe.strMealThumb : recipe.strDrinkThumb }
            alt={ isMeal(recipe) ? recipe.strMeal : recipe.strDrink }
            data-testid={ `${index}-card-img` }
          />
          <p
            data-testid={ `${index}-card-name` }
          >
            { isMeal(recipe) ? recipe.strMeal : recipe.strDrink }
          </p>
        </div>
      ))}
    </div>
  );
}

export default Recipes;
