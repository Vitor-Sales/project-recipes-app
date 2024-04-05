// A tipagem de RecipeContextType e Recipe foi feita apenas para o lint nao reclamar, quem for criar recipes deve modificar essa tipagem de acordo com seu código

export type RecipeContextType = {
  // recipes: Recipe[];
  searchVisible: boolean;
  searchToggle: () => void;
};

export type Recipe = {
  id: number;
  name: string;
  ingredients: string;
  preparation: string;
};

export type LoginType = {
  email: string;
  addEmail: (newEmail: string) => void;
  removeEmail: () => void;
};

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}
