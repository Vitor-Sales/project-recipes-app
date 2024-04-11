import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BodyDrinksProps } from '../../types';
import styles from './BodyDrinks.module.css';

function BodyDrinks({ drinks }: BodyDrinksProps) {
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    navigate(`/drinks/${id}`);
  };

  return (
    <div className={ styles.bodyDrinks }>
      <div className={ styles.drinksDisplay }>
        {drinks.map((drink, index) => (
          <div
            key={ drink.idDrink }
            className={ styles.drinkCard }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => handleCardClick(drink.idDrink) }
            role="button"
            tabIndex={ 0 }
            onKeyPress={ () => handleCardClick(drink.idDrink) }
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
