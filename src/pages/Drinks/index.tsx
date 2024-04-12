import { useState, useEffect, useContext } from 'react';
import { Drink } from '../../types';
import RecipeContext from '../../context/RecipeContext';
import BodyDrinks from './BodyDrinks';
import HeaderDrinks from './HeaderDrinks';
import CategoryDrinks from './CategoryDrinks';
import styles from './Drinks.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Drinks() {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { searchUrlDrink } = useContext(RecipeContext);

  useEffect(() => {
    const fetchDrinks = async () => {
      let url = searchUrlDrink;

      // Se o URL de pesquisa estiver vazio, use a URL padrão
      if (!url) {
        url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      }

      // Se uma categoria estiver selecionada e não for "All", modifique o URL
      if (selectedCategory && selectedCategory !== 'All') {
        url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
      }
      try {
        const response = await fetch(url);
        const data = await response.json();
        setDrinks(data.drinks.slice(0, 12));
      } catch (fetchError) {
        console.error(
          `Error fetching drinks for category ${selectedCategory}:`,
          fetchError,
        );
      }
    };

    fetchDrinks();
  }, [searchUrlDrink, selectedCategory]);
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
