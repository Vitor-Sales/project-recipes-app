import { useContext } from "react";

function Recipes() {
    const values = useContext(RecipeContext);
  return (
    <div>
      <h1>Receitas</h1>
    </div>
  );
}

export default Recipes;
