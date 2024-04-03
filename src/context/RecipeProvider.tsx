import RecipeContext from './RecipeContext';

type RecipeProviderProps = {
  children: React.ReactNode;
};

function RecipeProvider({ children }: RecipeProviderProps) {
  const values = {
  };

  return (
    <RecipeContext.Provider
      value={ values }
    >
      {children}
    </RecipeContext.Provider>
  );
}

export default RecipeProvider;
