import style from './DetailBtn.module.css';

function DetailsBtn({ id }) {
  const isItDone = JSON.parse(localStorage.getItem('doneRecipes'))
    .some((recipe) => recipe.id === id);

  if (isItDone) {
    return;
  }

  return (
    <button
      className={ style.startBtn }
      data-testid="start-recipe-btn"
    >
      Start Recipe
    </button>
  );
}

export default DetailsBtn;
