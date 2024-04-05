import React, { useState, useEffect } from 'react';
import { Drink } from '../../types';
import BodyDrinks from './BodyDrinks';
import HeaderDrinks from './HeaderDrinks';
import styles from './Drinks.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Drinks() {
  const [drinks, setDrinks] = useState<Drink[]>([]);

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => {
        if (data.drinks) {
          setDrinks(data.drinks.slice(0, 12));
        }
      });
  }, []);

  return (
    <div className={ styles.layout }>
      <Header />
      <div className={ styles.body }>
        <div className={ styles.pageDrinks }>
          <HeaderDrinks />
          <BodyDrinks drinks={ drinks } />
        </div>
      </div>
      <Footer />
    </div>
  );
}
