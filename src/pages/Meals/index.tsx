import { useState, useEffect, useContext } from 'react';
import RecipeContext from '../../context/RecipeContext';
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
  const { searchUrlMeal } = useContext(RecipeContext);

  useEffect(() => {
    const fetchMeals = async () => {
      // let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
      let url = searchUrlMeal;

      // Se o URL de pesquisa estiver vazio, use a URL padrão
      if (!url) {
        url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      }

      // Se uma categoria estiver selecionada e não for "All", modifique o URL
      if (selectedCategory && selectedCategory !== 'All') {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        setMeals(data.meals.slice(0, 12));
        const fetchedMeals = data.meals.slice(0, 12);
        setMeals(fetchedMeals);

        // Se houver apenas uma receita, direcione para a página de detalhes
        if (fetchedMeals.length === 1 && selectedCategory !== 'Goat') {
          const { idMeal } = fetchedMeals[0];
          window.location.href = `/meals/${idMeal}`;
        }
      } catch (error) {
        alert("Sorry, we haven't found any recipes for these filters");
        console.error(`Error fetching meals for category ${selectedCategory}:`, error);
      }
    };

    fetchMeals();
  }, [searchUrlMeal, selectedCategory]);

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
