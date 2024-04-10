import { useState } from 'react';
import RecipeContext from './RecipeContext';

type RecipeProviderProps = {
  children: React.ReactNode;
};

function RecipeProvider({ children }: RecipeProviderProps) {
  const [searchVisible, setSearchVisible] = useState(false);

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
  };

  return (
    <RecipeContext.Provider value={ values }>
      {children}
    </RecipeContext.Provider>
  );
}

export default RecipeProvider;
