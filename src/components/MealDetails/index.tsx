import { useContext } from 'react';
import RecipeContext from '../../context/RecipeContext';
import style from './MealDetails.module.css';
import DetailsBtn from '../DetailsBtn';
import FavShareBtns from '../FavShareBtns';
import { MealType, RecipeType } from '../../types';

function MealDetails({ detail, ingredients }
: { detail: MealType, ingredients: [string, unknown][] }) {
  const { drinks } = useContext(RecipeContext);

  const isItDone = JSON.parse(localStorage.getItem('doneRecipes') || '[]')
    .some((recipe: RecipeType) => recipe.id === detail.idMeal);

  return (
    <div>
      <section className={ style.Header }>
        <img
          className={ style.Banner }
          data-testid="recipe-photo"
          src={ detail.strMealThumb }
          alt={ detail.strMeal }
        />
        <div className={ style.HeaderLine }>
          <span
            className={ style.CategoryName }
            data-testid="recipe-category"
          >
            {detail.strCategory}
          </span>
          <FavShareBtns
            id={ detail.idMeal }
            type="meal"
            nationality={ detail.strArea }
            category={ detail.strCategory }
            alcoholicOrNot=""
            name={ detail.strMeal }
            image={ detail.strMealThumb }
          />
        </div>
        <h1
          data-testid="recipe-title"
          className={ style.TitleDetails }
        >
          {detail.strMeal}
        </h1>
      </section>
      <div className={ style.bodyDetails }>
        <h1 className={ style.TitleBody }>Ingredients</h1>
        <ol className={ style.ListDetails }>
          {ingredients.map((ing, index) => {
            return (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${ing[1]} 
                ${detail[`strMeasure${ing[0].slice('strIngredient'.length)}`]}`}
              </li>
            );
          })}
        </ol>
        <h1 className={ style.TitleBody }>Instructions</h1>
        <p
          className={ style.Instructions }
          data-testid="instructions"
        >
          {detail.strInstructions}
        </p>
        <h1 className={ style.TitleBody }>Video</h1>
        {detail.strYoutube && (
          <iframe
            className={ style.Video }
            data-testid="video"
            title={ detail.strMeal }
            src={ detail.strYoutube.replace('watch?v=', 'embed/') }
            allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        )}
        <h1 className={ style.TitleBody }>Recommended</h1>
        <div className={ style.recommendedScroll }>
          {drinks && drinks.slice(0, 6).map((recommended, index: any) => (
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
        {!isItDone && <DetailsBtn idRecipe={ detail.idMeal } />}
      </div>
    </div>
  );
}

export default MealDetails;
