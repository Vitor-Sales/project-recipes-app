import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import MealDetails from '../../components/MealDetails';
import DrinkDetails from '../../components/DrinkDetails';
import { DrinkType, MealType } from '../../types';

function RecipeDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [detail, setDetail] = useState({} as MealType);
  const [detail1, setDetail1] = useState({} as DrinkType);
  const [ingredients, setIngredients] = useState<[string, unknown][]>([]);
  const URLmeal = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const URLdrink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  useEffect(() => {
    try {
      const fetchDetails = async () => {
        if (pathname.includes('drinks')) {
          const response = await fetch(URLdrink);
          const data = await response.json();
          setDetail1(data.drinks[0]);
          setIngredients(Object.entries(data.drinks[0])
            .filter((e) => e[0].includes('strIngredient'))
            .filter((e) => e[1] !== '' && e[1] !== null));
        } else {
          const response = await fetch(URLmeal);
          const data = await response.json();
          setDetail(data.meals[0]);
          setIngredients(Object.entries(data.meals[0])
            .filter((e) => e[0].includes('strIngredient'))
            .filter((e) => e[1] !== '' && e[1] !== null));
        }
        // console.log(detail);
      };
      fetchDetails();
    } catch (error) {
      console.log(error);
    }
  }, [URLdrink, URLmeal, detail, pathname]);

  // Garante passar no teste no GitHub
  if (!Object.keys(detail).length && !Object.keys(detail1).length) {
    return <h1>Loading...</h1>;
  }

  return (
    Object.keys(detail).includes('idMeal')
      ? (
        <div>
          <MealDetails detail={ detail } ingredients={ ingredients } />
        </div>
      )
      : (
        <div>
          <DrinkDetails detail={ detail1 } ingredients={ ingredients } />
        </div>
      )
  );
}

export default RecipeDetails;
