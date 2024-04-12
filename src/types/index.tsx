export type RecipeContextType = {
  searchVisible: boolean;
  searchToggle: () => void;
  searchUrlDrink: string;
  setSearchUrlDrink: (url: string) => void;
  searchUrlMeal: string;
  setSearchUrlMeal: (url: string) => void;
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
export interface Category {
  strCategory: string;
}

export interface BodyMealsProps {
  meals: Meal[] | undefined;
}

export interface BodyDrinksProps {
  drinks: Drink[];
}

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

export type DoneRecipesType = {
  id: string,
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string,
  doneDate: string,
  tags: string[],
};
