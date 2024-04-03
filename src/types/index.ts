// A tipagem de RecipeContextType e Recipe foi feita apenas para o lint nao reclamar, quem for criar recipes deve modificar essa tipagem de acordo com seu código

export type RecipeContextType = {
  recipes: Recipe[];
};

export type Recipe = {
  id: number;
  name: string;
  ingredients: string;
  preparation: string;
};
