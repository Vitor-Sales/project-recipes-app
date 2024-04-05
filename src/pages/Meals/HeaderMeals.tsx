import { useContext } from 'react';
import RecipeContext from '../../context/RecipeContext';
import Search from '../../components/SearchBar';
import CategoryMeals from './CategoryMeals';
import styles from './HeaderMeals.module.css';
import MealsIcon from '../../images/mealIcon2.svg';

export default function HeaderMeals() {
  const { searchVisible } = useContext(RecipeContext);
  return (
    <div className={ styles.headerMeals }>
      <img src={ MealsIcon } alt="Drink Icon" className={ styles.icon } />
      <h1 className={ styles.titleMeals } data-testid="page-title">Meals</h1>
      { searchVisible && <Search />}
      <CategoryMeals />
    </div>
  );
}
