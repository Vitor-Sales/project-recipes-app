import React, { useState, useEffect } from 'react';
import { Meal } from '../../types'; // Note que Category não é mais necessário
import BodyMeals from './BodyMeals';
import HeaderMeals from './HeaderMeals';
import CategoryMeals from './CategoryMeals';
import styles from './Meals.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Meals() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const fetchMeals = async () => {
      let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      if (selectedCategory !== 'All') {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        setMeals(data.meals.slice(0, 12));
      } catch (error) {
        console.error(`Error fetching meals for category ${selectedCategory}:`, error);
      }
    };

    fetchMeals();
  }, [selectedCategory]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? 'All' : category));
  };

  return (
    <div className={ styles.layout }>
      <Header />
      <div className={ styles.body }>
        <div className={ styles.pageMeals }>
          <HeaderMeals />
          <CategoryMeals onCategorySelect={ handleCategoryClick } />
          <BodyMeals meals={ meals } />
        </div>
      </div>
      <Footer />
    </div>
  );
}
