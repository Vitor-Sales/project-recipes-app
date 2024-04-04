import style from './FavoriteRecipes.module.css';
import Favorite from '../../images/FavoriteRecipes.svg';
import all from '../../images/all.svg';
import food from '../../images/food.svg';
import drink from '../../images/drinks.svg';

export default function BodyFavoriteRecipes() {
  return (
    <div>
      <div className={ style.HeaderFavorite }>
        <img src={ Favorite } alt="Favorite" className={ style.icon } />
        <h1
          data-testid="page-title"
          className={ style.titleFavorite }
        >
          Favorite Recipes
        </h1>
        <div className={ style.GroupCategory }>
          <button type="button" className={ style.buttonsFavorite }>
            <img src={ all } alt="All" />
            <span className={ style.Title }>All</span>
          </button>
          <button type="button" className={ style.buttonsFavorite }>
            <img src={ food } alt="food" />
            <span className={ style.Title }>Food</span>
          </button>
          <button type="button" className={ style.buttonsFavorite }>
            <img src={ drink } alt="Drinks" />
            <span className={ style.Title }>Drinks</span>
          </button>
        </div>
      </div>
    </div>
  );
}
