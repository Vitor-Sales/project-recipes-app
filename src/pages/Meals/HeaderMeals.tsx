import { useContext } from 'react';
import RecipeContext from '../../context/RecipeContext';
import Search from '../../components/SearchBar';
import styles from './HeaderMeals.module.css';
import MealsIcon from '../../images/Design02/cooking.svg';

export default function HeaderMeals() {
  const { searchVisible } = useContext(RecipeContext);
  return (
    <div className={ styles.headerMeals }>
      <img src={ MealsIcon } alt="Drink Icon" className={ styles.icon } />
      <h1 className={ styles.titleMeals } data-testid="page-title">Meals</h1>
      { searchVisible && <Search />}
    </div>
  );
}
