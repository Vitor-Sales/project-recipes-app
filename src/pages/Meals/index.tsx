import React, { useState, useEffect } from 'react';
import { Meal, Category } from '../../types';
import BodyMeals from './BodyMeals';
import HeaderMeals from './HeaderMeals';
import styles from './Meals.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Meals() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        setCategories([{ strCategory: 'All' }, ...data.meals.slice(0, 5)]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

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
          <div className={ styles.categoryButtons }>
            {categories.map((category) => (
              <button
                key={ category.strCategory }
                className={ `btn btn-primary
                ${selectedCategory === category.strCategory ? 'active' : ''}` }
                data-testid={ `${category.strCategory}-category-filter` }
                onClick={ () => handleCategoryClick(category.strCategory) }
              >
                {category.strCategory}
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
