import React, { useState, useEffect } from 'react';
import { Meal } from '../../types';
import BodyMeals from './BodyMeals';

function Meals() {
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => {
        if (data.meals) {
          setMeals(data.meals.slice(0, 12));
        }
      });
  }, []);

  return <BodyMeals meals={ meals } />;
}

export default Meals;
