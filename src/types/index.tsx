export type RecipeContextType = {
  searchVisible: boolean;
  searchToggle: () => void;
  meals: MealType[],
  drinks: DrinkType[],
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

export type DrinkType = {
  [key: string ]: string,
  idDrink: string,
  strDrink: string,
  strTags: string,
  strCategory: string,
  strIBA: string,
  strAlcoholic: string,
  strGlass: string,
  strInstructions: string,
  strDrinkThumb: string,
  strImageSource: string,
  strImageAttribution: string,
  strCreativeCommonsConfirmed: string,
  dateModified: string
};

// export type DrinkIngredientsType = {
//   strIngredient1: string | null,
//   strIngredient2: string | null,
//   strIngredient3: string | null,
//   strIngredient4: string | null,
//   strIngredient5: string | null,
//   strIngredient6: string | null,
//   strIngredient7: string | null,
//   strIngredient8: string | null,
//   strIngredient9: string | null,
//   strIngredient10: string | null,
//   strIngredient11: string | null,
//   strIngredient12: string | null,
//   strIngredient13: string | null,
//   strIngredient14: string | null,
//   strIngredient15: string | null,
// };

export type MealType = {
  [key: string ]: string,
  idMeal: string,
  strMeal: string,
  strCategory: string,
  strArea: string,
  strInstructions: string,
  strMealThumb: string,
  strTags: string,
  strYoutube: string,
};

// export type MealIngredientType = {
//   strIngredient1: string | null,
//   strIngredient2: string | null,
//   strIngredient3: string | null,
//   strIngredient4: string | null,
//   strIngredient5: string | null,
//   strIngredient6: string | null,
//   strIngredient7: string | null,
//   strIngredient8: string | null,
//   strIngredient9: string | null,
//   strIngredient10: string | null,
//   strIngredient11: string | null,
//   strIngredient12: string | null,
//   strIngredient13: string | null,
//   strIngredient14: string | null,
//   strIngredient15: string | null,
//   strIngredient16: string | null,
//   strIngredient17: string | null,
//   strIngredient18: string | null,
//   strIngredient19: string | null,
//   strIngredient20: string | null,
// };

export type RecipeType = {
  id: string,
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string,
  doneDate: string,
  tags: string,
};
