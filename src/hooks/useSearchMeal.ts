import { useState, useContext } from 'react';
import RecipeContext from '../context/RecipeContext';

type SearchType = 'ingredient' | 'name' | 'first-letter';

const useSearchMeal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setSearchUrlMeal } = useContext(RecipeContext);

  const search = async (searchTerm: string, searchType: SearchType) => {
    setIsLoading(true);
    setError(null);

    try {
      let url = '';
      const encodedSearchTerm = encodeURIComponent(searchTerm);

      if (searchType === 'ingredient') {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodedSearchTerm}`;
      } else if (searchType === 'name') {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodedSearchTerm}`;
      } else if (searchType === 'first-letter') {
        if (searchTerm.length !== 1) {
          throw new Error('Your search must have only 1 (one) character');
        }
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${encodedSearchTerm}`;
      } else {
        throw new Error(`Invalid search type: ${searchType}`);
      }
      setSearchUrlMeal(url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, search };
};

export default useSearchMeal;
