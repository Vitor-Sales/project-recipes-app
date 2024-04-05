// Meals/index.tsx
import React, { useState, useEffect } from 'react';
import { Meal } from '../../types'; // Caminho pode precisar ser ajustado.
import BodyMeals from './BodyMeals';
import HeaderMeals from './HeaderMeals';
import styles from './Meals.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Meals() {
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setMeals(data.meals.slice(0, 12));
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchMeals();
  }, []);

  return (
    <div className={ styles.layout }>
      <Header />
      <div className={ styles.body }>
        <div className={ styles.pageMeals }>
          <HeaderMeals />
          <BodyMeals meals={ meals } />
        </div>
      </div>
      <Footer />
    </div>
  );
}
