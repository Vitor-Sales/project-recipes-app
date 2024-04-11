import style from './CategoryDrinks.module.css';
import allDrinks from '../../images/DrinksIcons/AllDink.svg';
import Cocktail from '../../images/DrinksIcons/Cocktail.svg';
import Cocoa from '../../images/DrinksIcons/Cocoa.svg';
import OrdinaryDrink from '../../images/DrinksIcons/OrdinaryDrink.svg';
import Other from '../../images/DrinksIcons/Other.svg';
import Shake from '../../images/DrinksIcons/Shake.svg';

export default function CategoryDrinks() {
  return (
    <div className={ style.bodyCategoryDrinks }>
      <button className={ style.CategoryDrinks }>
        <img src={ allDrinks } alt="All Drinks" />
        <span className={ style.Title }>All</span>
      </button>
      <button className={ style.CategoryDrinks }>
        <img src={ Cocktail } alt="All Drinks" />
        <span className={ style.Title }>Cocktail</span>
      </button>
      <button className={ style.CategoryDrinks }>
        <img src={ Cocoa } alt="All Drinks" />
        <span className={ style.Title }>Cocoa</span>
      </button>
      <button className={ style.CategoryDrinks }>
        <img src={ OrdinaryDrink } alt="All Drinks" />
        <span className={ style.Title }>Ordinary Drink</span>
      </button>
      <button className={ style.CategoryDrinks }>
        <img src={ Other } alt="All Drinks" />
        <span className={ style.Title }>Other/ Unknow </span>
      </button>
      <button className={ style.CategoryDrinks }>
        <img src={ Shake } alt="All Drinks" />
        <span className={ style.Title }>Shake</span>
      </button>
    </div>
  );
}
