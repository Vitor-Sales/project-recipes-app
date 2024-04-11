import React, { useState, useEffect } from 'react';
import { Drink } from '../../types';
import BodyDrinks from './BodyDrinks';
import HeaderDrinks from './HeaderDrinks';
import CategoryDrinks from './CategoryDrinks';
import styles from './Drinks.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Drinks() {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const fetchDrinks = async () => {
      let url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      if (selectedCategory !== 'All') {
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
  const handleCategorySelect = (category: string) => {
    setSelectedCategory((prevCategory) => {
      return prevCategory === category ? 'All' : category;
    });
  };

  return (
    <div className={ styles.layout }>
      <Header />
      <div className={ styles.body }>
        <div className={ styles.pageDrinks }>
          <HeaderDrinks />
          <CategoryDrinks onCategorySelect={ handleCategorySelect } />
          <BodyDrinks drinks={ drinks } />
        </div>
      </div>
      <Footer />
    </div>
  );
}
