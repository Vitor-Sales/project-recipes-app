import { useContext } from 'react';
import RecipeContext from '../../context/RecipeContext';
import style from './MealDetails.module.css';
import DetailsBtn from '../DetailsBtn';

function MealDetails({ detail, ingredients }) {
  const { drinks } = useContext(RecipeContext);

  const isItDone = JSON.parse(localStorage.getItem('doneRecipes'))
  && JSON.parse(localStorage.getItem('doneRecipes'))
    .some((recipe) => recipe.id === detail.idMeal);

  const doneRecipe = [{
    id: detail.idMeal,
    type: 'meal',
    nationality: detail.strArea,
    category: detail.strCategory,
    alcoholicOrNot: '',
    name: detail.strMeal,
    image: detail.strMealThumb,
    doneDate: 'doneDate',
    tags: detail.strTags ? detail.strTags.split(',') : [],
  }];

  const inProgressRecipe = {
    drinks: {
      11007: ['Tequilla', 'Triple sec', 'Lime juice', 'Salt'],
    },
    meals: {
      52772: ['soy sauce', 'water', 'brown sugar', 'ground ginger', 'minced garlic', 'chicken breasts', 'stir-fry vegetables', 'brown rice'],
    },
  };

  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipe));
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipe));

  return (
    <div>
      <div>
        <h1
          data-testid="recipe-title"
        >
          {detail.strMeal}
        </h1>
        <img
          data-testid="recipe-photo"
          className={ style.img }
          src={ detail.strMealThumb }
          alt={ detail.strMeal }
        />
        <p data-testid="recipe-category">{detail.strCategory}</p>
      </div>
      <h2>Ingredients</h2>
      <ol>
        {ingredients.map((ing, index) => {
          return (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${ing[1]} ${detail[`strMeasure${ing[0].slice('strIngredient'.length)}`]}`}
            </li>
          );
        })}
      </ol>
      <h2>Instructions</h2>
      <p
        className={ style.instructions }
        data-testid="instructions"
      >
        {detail.strInstructions}
      </p>
      <h2>Video</h2>
      {detail.strYoutube && (
        <iframe
          width="300"
          height="200"
          data-testid="video"
          title={ detail.strMeal }
          src={ detail.strYoutube.replace('watch?v=', 'embed/') }
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      )}
      <div>
        <h2>Recommended</h2>
        <div className={ style.recommendedScroll }>
          {drinks && drinks.slice(0, 6).map((recommended, index) => (
            <div
              key={ recommended.strDrink }
              data-testid={ `${index}-recommendation-card` }
              className={ style.recommendedCard }
            >
              <img src={ recommended.strDrinkThumb } alt={ recommended.strDrink } />
              <p
                data-testid={ `${index}-recommendation-title` }
              >
                {recommended.strDrink}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* {(!JSON.parse(localStorage.getItem('doneRecipes'))
      || JSON.parse(localStorage.getItem('doneRecipes'))
        .every((recipe) => recipe.id !== detail.idMeal)) && (
          <button
            className={ style.startBtn }
            data-testid="start-recipe-btn"
          >
            Start Recipe
          </button>
      )} */}
      {!isItDone && <DetailsBtn id={ detail.idMeal } />}
    </div>
  );
}

export default MealDetails;
