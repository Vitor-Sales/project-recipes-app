import React, { useState, useEffect } from 'react';
import { Drink, Category } from '../../types';
import BodyDrinks from './BodyDrinks';
import HeaderDrinks from './HeaderDrinks';
import styles from './Drinks.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Drinks() {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        setCategories([{ strCategory: 'All' }, ...data.drinks.slice(0, 5)]);
      } catch (error) {
        console.error('Error fetching drink categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchDrinks = async () => {
      let url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      if (selectedCategory && selectedCategory !== 'All') {
        url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        setDrinks(data.drinks.slice(0, 12));
      } catch (error) {
        console.error(`Error fetching drinks for category ${selectedCategory}:`, error);
      }
    };

    fetchDrinks();
  }, [selectedCategory]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? 'All' : category));
  };

  return (
    <div className={ styles.layout }>
      <Header />
      <div className={ styles.body }>
        <div className={ styles.pageDrinks }>
          <HeaderDrinks />
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
          <BodyDrinks drinks={ drinks } />
        </div>
      </div>
      <Footer />
    </div>
  );
}
