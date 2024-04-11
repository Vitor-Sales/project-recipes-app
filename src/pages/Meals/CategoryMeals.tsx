import style from './CategoryMeals.module.css';

import allMeals from '../../images/MealsIcons/AllMeals.svg';
import Beef from '../../images/MealsIcons/Beef.svg';
import Breakfast from '../../images/MealsIcons/Breakfast.svg';
import Chicken from '../../images/MealsIcons/Chicken.svg';
import Dessert from '../../images/MealsIcons/Dessert.svg';
import Goat from '../../images/MealsIcons/Goat.svg';

export default function CategoryMeals() {
  return (
    <div className={ style.bodyCategoryMeals }>
      <button className={ style.CategoryMeals }>
        <img src={ allMeals } alt="All Drinks" />
        <span className={ style.Title }>All</span>
      </button>
      <button className={ style.CategoryMeals }>
        <img src={ Beef } alt="All Drinks" />
        <span className={ style.Title }>Beef</span>
      </button>
      <button className={ style.CategoryMeals }>
        <img src={ Breakfast } alt="All Drinks" />
        <span className={ style.Title }>Breakfast</span>
      </button>
      <button className={ style.CategoryMeals }>
        <img src={ Chicken } alt="All Drinks" />
        <span className={ style.Title }>Chicken</span>
      </button>
      <button className={ style.CategoryMeals }>
        <img src={ Dessert } alt="All Drinks" />
        <span className={ style.Title }>Dessert</span>
      </button>
      <button className={ style.CategoryMeals }>
        <img src={ Goat } alt="All Drinks" />
        <span className={ style.Title }>Goat</span>
      </button>
    </div>
  );
}
