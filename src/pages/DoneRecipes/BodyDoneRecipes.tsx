import style from './DoneRecipes.module.css';
import DoneRecupies from '../../images/DoneRecipes.svg';
import all from '../../images/all.svg';
import food from '../../images/food.svg';
import drink from '../../images/drinks.svg';

export default function BodyDoneRecipes() {
  return (
    <div>
      <div className={ style.HeaderDone }>
        <img src={ DoneRecupies } alt="Done" className={ style.icon } />
        <h1 data-testid="page-title" className={ style.titleDone }>Done Recipes</h1>
        <div className={ style.GroupCategory }>
          <button type="button" className={ style.buttonsDone }>
            <img src={ all } alt="All" />
            <span className={ style.Title }>All</span>
          </button>
          <button type="button" className={ style.buttonsDone }>
            <img src={ food } alt="food" />
            <span className={ style.Title }>Food</span>
          </button>
          <button type="button" className={ style.buttonsDone }>
            <img src={ drink } alt="Drinks" />
            <span className={ style.Title }>Drinks</span>
          </button>
        </div>
      </div>
    </div>
  );
}
