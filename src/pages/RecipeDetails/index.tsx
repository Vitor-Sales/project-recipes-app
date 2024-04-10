import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import MealDetails from '../../components/MealDetails';
import DrinkDetails from '../../components/DrinkDetails';

function RecipeDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [detail, setDetail] = useState({});
  const [ingredients, setIngredients] = useState<[string, unknown][]>([]);
  const URLmeal = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const URLdrink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  useEffect(() => {
    try {
      const fetchDetails = async () => {
        if (pathname.includes('drinks')) {
          const response = await fetch(URLdrink);
          const data = await response.json();
          setDetail(data.drinks[0]);
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
        console.log(ingredients);
      };
      fetchDetails();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    Object.keys(detail).includes('idMeal')
      ? (
        <div>
          <MealDetails detail={ detail } ingredients={ ingredients } />
        </div>
      )
      : (
        <div>
          <DrinkDetails detail={ detail } ingredients={ ingredients } />
        </div>
      )
  );
}

export default RecipeDetails;
