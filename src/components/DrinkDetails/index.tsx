import { useContext } from 'react';
import RecipeContext from '../../context/RecipeContext';
import style from './DrinkDetails.module.css';

function DrinkDetails({ detail, ingredients }) {
  const { meals } = useContext(RecipeContext);

  const doneRecipe = [{
    id: detail.idDrink,
    type: 'drink',
    nationality: '',
    category: detail.strCategory,
    alcoholicOrNot: detail.strAlcoholic,
    name: detail.strDrink,
    image: detail.strDrinkThumb,
    doneDate: 'doneDate',
    tags: detail.strTags ? detail.strTags.split(',') : [],
  }];

  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipe));

  return (
    <div>
      <div>
        <h1
            // className={ style.title }
          data-testid="recipe-title"
        >
          {detail.strDrink}
        </h1>
        <img
          data-testid="recipe-photo"
            // className={ style.img }
          src={ detail.strDrinkThumb }
          alt={ detail.strDrink }
          className={ style.img }
        />
        <p data-testid="recipe-category">
          {detail.strAlcoholic === 'Alcoholic'
            ? 'Alcoholic' : 'Non-Alcoholic'}
        </p>
      </div>
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
      <p
        className={ style.instructions }
        data-testid="instructions"
      >
        {detail.strInstructions}
      </p>
      {detail.strYoutube && (
        <iframe
          width="300"
          height="200"
          data-testid="video"
          title={ detail.strDrink }
          src={ detail.strYoutube.replace('watch?v=', 'embed/') }
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      )}
      <div className={ style.recommendedScroll }>
        {meals && meals.slice(0, 6).map((recommendation, index) => (
          <div
            key={ recommendation.strMeal }
            className={ style.recommendedCard }
            data-testid={ `${index}-recommendation-card` }
          >
            <img src={ recommendation.strMealThumb } alt={ recommendation.strMeal } />
            <p
              data-testid={ `${index}-recommendation-title` }
            >
              {recommendation.strMeal}
            </p>
          </div>
        ))}
      </div>
      {(!JSON.parse(localStorage.getItem('doneRecipes'))
      || JSON.parse(localStorage.getItem('doneRecipes'))
        .every((recipe) => recipe.id !== detail.idDrink)) && (
          <button
            className={ style.startBtn }
            data-testid="start-recipe-btn"
          >
            Start Recipe
          </button>
      )}
    </div>
  );
}

export default DrinkDetails;
