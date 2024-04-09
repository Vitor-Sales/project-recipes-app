import { useContext } from 'react';
import RecipeContext from '../../context/RecipeContext';
import style from './MealDetails.module.css';
import DetailsBtn from '../DetailsBtn';
import FavShareBtns from '../FavShareBtns';

function MealDetails({ detail, ingredients }) {
  const { drinks } = useContext(RecipeContext);

  const isItDone = JSON.parse(localStorage.getItem('doneRecipes') || '[]')
    .some((recipe) => recipe.id === detail.idMeal);

  return (
    <div>
      <div>
        <p data-testid="recipe-category">{detail.strCategory}</p>
        <FavShareBtns />
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
      {!isItDone && <DetailsBtn idRecipe={ detail.idMeal } />}
    </div>
  );
}

export default MealDetails;
