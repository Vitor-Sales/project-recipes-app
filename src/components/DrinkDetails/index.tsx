import { useContext } from 'react';
import RecipeContext from '../../context/RecipeContext';
import style from './DrinkDetails.module.css';
import DetailsBtn from '../DetailsBtn';
import FavShareBtns from '../FavShareBtns';
import { DrinkType, RecipeType } from '../../types';

function DrinkDetails({ detail, ingredients }
: { detail: DrinkType, ingredients: [string, unknown][] }) {
  const { meals } = useContext(RecipeContext);

  const isItDone = JSON.parse(localStorage.getItem('doneRecipes') || '[]')
    .some((recipe: RecipeType) => recipe.id === detail.idDrink);

  return (
    <div>
      <section className={ style.Header }>
        {/* {detail.strDrinkThumb} */}
        <img
          className={ style.Banner }
          data-testid="recipe-photo"
          src={ detail.strDrinkThumb }
          alt={ detail.strDrink }
        />
        <div className={ style.HeaderLine }>
          <span
            className={ style.CategoryName }
            data-testid="recipe-category"
          >
            {detail.strAlcoholic === 'Alcoholic'
              ? 'Alcoholic' : 'Non-Alcoholic'}
          </span>
          <FavShareBtns
            id={ detail.idDrink }
            type="drink"
            nationality=""
            category={ detail.strCategory }
            alcoholicOrNot={ detail.strAlcoholic }
            name={ detail.strDrink }
            image={ detail.strDrinkThumb }
          />
        </div>
        <h1
          data-testid="recipe-title"
          className={ style.TitleDetails }
        >
          {detail.strDrink}
        </h1>

      </section>
      <div className={ style.bodyDetails }>
        <h1 className={ style.TitleBody }>Ingredients</h1>
        <ol className={ style.ListDetails }>
          {ingredients.map((ing, index: any) => {
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

        <h1 className={ style.TitleBody }>Recommended</h1>
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
        {!isItDone && <DetailsBtn
          idRecipe={ detail.idDrink }
        />}
      </div>
    </div>
  );
}

export default DrinkDetails;
