// Meals/index.tsx
import React, { useState, useEffect } from 'react';
import { Meal } from '../../types';
import BodyMeals from './BodyMeals'; // Asegure-se que o caminho do import está correto

function Meals() {
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => {
        if (data.meals) { // Certifica-se de que meals não é null/undefined
          setMeals(data.meals.slice(0, 12));
        }
      });
  }, []);

  // Passa meals como prop para BodyMeals
  return <BodyMeals meals={ meals } />;
}

export default Meals;
