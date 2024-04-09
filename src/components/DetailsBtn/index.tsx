import { useEffect, useState } from 'react';
import style from './DetailBtn.module.css';

function DetailsBtn({ id }: { id: string }) {
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
  const mealsProgress = Object.keys(inProgress.meals || {}) || [];
  const drinksProgress = Object.keys(inProgress.drinks || {}) || [];
  const verification = mealsProgress.some((idProgress) => idProgress === id)
     || drinksProgress.some((idProgress) => idProgress === id);

  return (
    <button
      className={ style.startBtn }
      data-testid="start-recipe-btn"
    >
      {verification
        ? 'Continue Recipe' : 'Start Recipe'}
    </button>
  );
}

export default DetailsBtn;
