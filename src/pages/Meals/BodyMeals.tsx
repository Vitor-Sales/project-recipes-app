import React from 'react';
import { Meal } from '../../types';
import styles from './BodyMeals.module.css';

interface BodyMealsProps {
  meals: Meal[] | undefined;
}

function BodyMeals({ meals }: BodyMealsProps) {
  if (!meals) {
    return <div>Loading...</div>;
  }

  return (
    <div className={ styles.bodyMeals }>
      <div className={ styles.mealsDisplay }>
        {meals.map((meal, index) => (
          <div
            key={ meal.idMeal }
            className={ styles.mealsCard }
            data-testid={ `${index}-recipe-card` }
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
    </div>
  );
}

export default BodyMeals;
