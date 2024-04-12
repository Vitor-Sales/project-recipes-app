import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BodyMealsProps } from '../../types';
import styles from './BodyMeals.module.css';

function BodyMeals({ meals }: BodyMealsProps) {
  const navigate = useNavigate();

  function handleCardClick(id: string) {
    navigate(`/meals/${id}`);
  }

  if (!meals) {
    return <div>Loading...</div>;
  }

  return (
    <div className={ styles.bodyMeals }>
      {meals.map((meal, index) => (
        <div
          key={ meal.idMeal }
          className={ styles.mealsCard }
          data-testid={ `${index}-recipe-card` }
          onClick={ () => handleCardClick(meal.idMeal) }
          role="button"
          tabIndex={ 0 }
          onKeyPress={ () => handleCardClick(meal.idMeal) }
        >
          <img
            src={ meal.strMealThumb }
            alt={ meal.strMeal }
            className={ styles.mealsImg }
            data-testid={ `${index}-card-img` }
          />
          <span className={ styles.mealsName } data-testid={ `${index}-card-name` }>
            {meal.strMeal}
          </span>
        </div>
      ))}
    </div>
  );
}

export default BodyMeals;
