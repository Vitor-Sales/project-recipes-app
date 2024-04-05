function MealDetails({ detail, ingredients }) {
  return (
    <div>
      <div>
        <h1
          // className={ style.title }
          data-testid="recipe-title"
        >
          {detail.strMeal}
        </h1>
        <img
          data-testid="recipe-photo"
          // className={ style.img }
          src={ detail.strMealThumb }
          alt={ detail.strMeal }
        />
        <p data-testid="recipe-category">{detail.strCategory}</p>
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
      <p data-testid="instructions">{detail.strInstructions}</p>
      {/* <iframe width="560" height="315" src={ detail.strYoutube } title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen /> */}
      <iframe width="560" height="315" src="https://www.youtube.com/watch?v=-gF8d-fitkU" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen />
    </div>
  );
}

export default MealDetails;
