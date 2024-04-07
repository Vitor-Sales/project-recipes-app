import React, { useState, useEffect } from 'react';
import { Drink, Category } from '../../types'; // Importe a interface Category junto com Drink
import BodyDrinks from './BodyDrinks';
import HeaderDrinks from './HeaderDrinks';
import styles from './Drinks.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Drinks() {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setDrinks(data.drinks.slice(0, 12));
      } catch (error) {
        console.error('Error fetching drinks:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        // Use a interface Category ao mapear as categorias
        const fetchedCategories = data.drinks.map((cat:
        Category) => cat.strCategory).slice(0, 5);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching drink categories:', error);
      }
    };

    fetchDrinks();
    fetchCategories();
  }, []);

  return (
    <div className={ styles.layout }>
      <Header />
      <div className={ styles.body }>
        <div className={ styles.pageDrinks }>
          <HeaderDrinks />
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
          <BodyDrinks drinks={ drinks } />
        </div>
      </div>
      <Footer />
    </div>
  );
}
