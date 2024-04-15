import React from 'react';
import style from './CategoryDrinks.module.css';
import allDrinks from '../../images/Design02/DrinksIcons/AllDrink.svg';
import Cocktail from '../../images/Design02/DrinksIcons/Cocktail.svg';
import Cocoa from '../../images/Design02/DrinksIcons/Cocoa.svg';
import OrdinaryDrink from '../../images/Design02/DrinksIcons/OrdinaryDrink.svg';
import Other from '../../images/Design02/DrinksIcons/Other.svg';
import Shake from '../../images/Design02/DrinksIcons/Shake.svg';

interface CategoryDrinksProps {
  onCategorySelect: (category: string) => void;
}

function CategoryDrinks({ onCategorySelect }: CategoryDrinksProps) {
  const categories = [
    { name: 'All', icon: allDrinks },
    { name: 'Cocktail', icon: Cocktail },
    { name: 'Cocoa', icon: Cocoa },
    { name: 'Ordinary Drink', icon: OrdinaryDrink },
    { name: 'Other/Unknown', icon: Other },
    { name: 'Shake', icon: Shake },
  ];

  return (
    <div className={ style.bodyCategoryDrinks }>
      {categories.map((category) => (
        <div
          key={ category.name }
          role="button"
          tabIndex={ 0 }
          onClick={ () => onCategorySelect(category.name) }
          onKeyPress={ () => onCategorySelect(category.name) }
          className={ style.CategoryDrinks }
          data-testid={ `${category.name}-category-filter` }
        >
          <img src={ category.icon } alt={ `${category.name} category` } />
          <span className={ style.Title }>{category.name}</span>
        </div>
      ))}
    </div>
  );
}

export default CategoryDrinks;
