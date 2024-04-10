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
      <p data-testid="recipe-category">
        {detail.strAlcoholic === 'Alcoholic'
          ? 'Alcoholic' : 'Non-Alcoholic'}
      </p>
      <FavShareBtns
        id={ detail.idDrink }
        type="drink"
        nationality=""
        category={ detail.strCategory }
        alcoholicOrNot={ detail.strAlcoholic }
        name={ detail.strDrink }
        image={ detail.strDrinkThumb }
      />
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
      </div>
      <ol>
        {ingredients.map((ing, index: any) => {
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
      {/* {detail.strYoutube && (
        // <iframe
        //   width="300"
        //   height="200"
        //   data-testid="video"
        //   title={ detail.strDrink }
        //   src={ detail.strYoutube.replace('watch?v=', 'embed/') }
        //   frameBorder="0"
        //   allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
        //   allowFullScreen
        // />
      )} */}
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
      {!isItDone && <DetailsBtn idRecipe={ detail.idDrink } />}
    </div>
  );
}

export default DrinkDetails;
