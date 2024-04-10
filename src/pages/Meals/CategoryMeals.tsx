import React from 'react';
import style from './CategoryMeals.module.css';
import allMeals from '../../images/MealsIcons/AllMeals.svg';
import Beef from '../../images/MealsIcons/Beef.svg';
import Breakfast from '../../images/MealsIcons/Breakfast.svg';
import Chicken from '../../images/MealsIcons/Chicken.svg';
import Dessert from '../../images/MealsIcons/Dessert.svg';
import Goat from '../../images/MealsIcons/Goat.svg';

interface CategoryMealsProps {
  onCategorySelect: (category: string) => void;
}

function CategoryMeals({ onCategorySelect }: CategoryMealsProps) {
  const categories = [
    { name: 'All', icon: allMeals },
    { name: 'Beef', icon: Beef },
    { name: 'Breakfast', icon: Breakfast },
    { name: 'Chicken', icon: Chicken },
    { name: 'Dessert', icon: Dessert },
    { name: 'Goat', icon: Goat },
  ];

  return (
    <div className={ style.bodyCategoryMeals }>
      {categories.map((category) => (
        <div
          key={ category.name }
          role="button"
          tabIndex={ 0 }
          onClick={ () => onCategorySelect(category.name) }
          onKeyPress={ () => onCategorySelect(category.name) }
          className={ style.CategoryMeals }
          data-testid={ `${category.name}-category-filter` }
        >
          <img src={ category.icon } alt={ `${category.name} category` } />
          <span className={ style.Title }>{category.name}</span>
        </div>
      ))}
    </div>
  );
}

export default CategoryMeals;
