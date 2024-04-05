import { useEffect, useState } from 'react';
import style from './CoverPage.module.css';
import MealDetails from '../../components/MealDetails';

function RecipeDetails() {
  const [detail, setDetail] = useState({});
  const [ingredients, setIngredients] = useState<never[]>([]);
  const URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772';

  useEffect(() => {
    try {
      const fetchDetails = async () => {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772');
        const data = await response.json();

        setDetail(data.meals[0]);
        setIngredients(Object.entries({
          strIngredient1: data.meals[0].strIngredient1,
          strIngredient2: data.meals[0].strIngredient2,
          strIngredient3: data.meals[0].strIngredient3,
          strIngredient4: data.meals[0].strIngredient4,
          strIngredient5: data.meals[0].strIngredient5,
          strIngredient6: data.meals[0].strIngredient6,
          strIngredient7: data.meals[0].strIngredient7,
          strIngredient8: data.meals[0].strIngredient8,
          strIngredient9: data.meals[0].strIngredient9,
          strIngredient10: data.meals[0].strIngredient10,
          strIngredient11: data.meals[0].strIngredient11,
          strIngredient12: data.meals[0].strIngredient12,
          strIngredient13: data.meals[0].strIngredient13,
          strIngredient14: data.meals[0].strIngredient14,
          strIngredient15: data.meals[0].strIngredient15,
          strIngredient16: data.meals[0].strIngredient16,
          strIngredient17: data.meals[0].strIngredient17,
          strIngredient18: data.meals[0].strIngredient18,
          strIngredient19: data.meals[0].strIngredient19,
          strIngredient20: data.meals[0].strIngredient20,
        }).filter((ing) => { if (ing[1]) return ing; }));
        //   Object.entries(mealsDrinks)
        // .filter((e) => e[0].includes('strIngredient'))
        // .filter((e) => e[1] !== '')
        // const Object.keys(details).filter((key) => key.include(strIngredient))
      };
      fetchDetails();
      console.log(detail);
      console.log(ingredients);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <MealDetails detail={ detail } ingredients={ ingredients } />
    </div>
  );
}

export default RecipeDetails;
