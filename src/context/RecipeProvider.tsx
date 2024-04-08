import { useEffect, useState } from 'react';
import RecipeContext from './RecipeContext';
import { RecipeContextType } from '../types';

type RecipeProviderProps = {
  children: React.ReactNode;
};

function RecipeProvider({ children }: RecipeProviderProps) {
  const [searchVisible, setSearchVisible] = useState(false);
  const [meals, setMeals] = useState<never[]>([]);
  const [drinks, setDrinks] = useState<never[]>([]);

  useEffect(() => {
    try {
      const fetchAPIs = async () => {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        const responseDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const dataDrinks = await responseDrinks.json();
        setMeals(data.meals);
        setDrinks(dataDrinks.drinks);
      };
      fetchAPIs();
    } catch (error) {
      console.log(error);
    }
  }, []);

  function searchToggle() {
    if (searchVisible === false) {
      setSearchVisible(true);
    } else {
      setSearchVisible(false);
    }
  }

  const values = {
    searchVisible,
    searchToggle,
    drinks,
    meals,
  };

  return (
    <RecipeContext.Provider value={ values }>
      {children}
    </RecipeContext.Provider>
  );
}

export default RecipeProvider;
