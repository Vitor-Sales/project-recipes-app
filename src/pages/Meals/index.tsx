import React, { useState, useEffect } from 'react';
import { Meal, Category } from '../../types';
import BodyMeals from './BodyMeals';
import HeaderMeals from './HeaderMeals';
import styles from './Meals.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Meals() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

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

    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        const fetchedCategories = data.meals.map((cat:
        Category) => cat.strCategory).slice(0, 5);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchMeals();
    fetchCategories();
  }, []);

  return (
    <div className={ styles.layout }>
      <Header />
      <div className={ styles.body }>
        <div className={ styles.pageMeals }>
          <HeaderMeals />
          <div className={ styles.categoryButtons }>
            {categories.map((category) => (
              <button
                key={ category }
                className="btn btn-primary"
                data-testid={ `${category}-category-filter` }
              >
                {category}
              </button>
            ))}
          </div>
          <BodyMeals meals={ meals } />
        </div>
      </div>
      <Footer />
    </div>
  );
}
