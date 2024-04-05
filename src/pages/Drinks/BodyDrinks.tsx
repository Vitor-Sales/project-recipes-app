import React from 'react';
import { Drink } from '../../types';
import styles from './BodyDrinks.module.css';

interface BodyDrinksProps {
  drinks: Drink[];
}
function BodyDrinks({ drinks }: BodyDrinksProps) {
  return (
    <div className={ styles.bodyDrinks }>
      <div className={ styles.drinksDisplay }>
        {drinks.map((drink, index) => (
          <div
            key={ drink.idDrink }
            className={ styles.drinkCard }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              className={ styles.drinkImg }
              data-testid={ `${index}-card-img` }
            />
            <span className={ styles.drinkName } data-testid={ `${index}-card-name` }>
              {drink.strDrink}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BodyDrinks;
