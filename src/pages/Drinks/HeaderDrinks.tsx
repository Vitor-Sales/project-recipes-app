import { useContext } from 'react';
import RecipeContext from '../../context/RecipeContext';
import Search from '../../components/SearchBar';
import styles from './HeaderDrinks.module.css';
import drinkIcon from '../../images/Design02/waiter.svg';

export default function HeaderDrinks() {
  const { searchVisible } = useContext(RecipeContext);
  return (
    <div className={ styles.headerDrinks }>
      <img src={ drinkIcon } alt="Drink Icon" className={ styles.icon } />
      <h1 className={ styles.titleDrinks } data-testid="page-title">Drinks</h1>
      { searchVisible && <Search />}
    </div>
  );
}
