import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DoneRecipesType } from '../../types';
import style from './DoneRecipes.module.css';
import DoneRecupies from '../../images/DoneRecipes.svg';
import all from '../../images/all.svg';
import Meals from '../../images/food.svg';
import drink from '../../images/drinks.svg';
import shareIcon from '../../images/shareIcon.svg';

export default function DoneRecipes() {
  const [recipes, setRecipes] = useState<DoneRecipesType[]>([]);
  const [copiedRecipeId, setCopiedRecipeId] = useState<string | null>(null);
  const [buttonFilter, setButtonFilter] = useState('All');

  useEffect(() => {
    const storedRecipes = localStorage.getItem('doneRecipes');
    const retrievedRecipes = storedRecipes ? JSON
      .parse(storedRecipes) as DoneRecipesType[] : [];

    setRecipes(retrievedRecipes);
  }, []);

  const handleRecipes = (value: string) => {
    setButtonFilter(value);
  };

  const handleShareButtonClick = async (id: string, type: string) => {
    const recipeUrl = `http://localhost:3000/${type}s/${id}`;

    await navigator.clipboard.writeText(recipeUrl)
      .then(() => {
        console.log('Link copied!');

        setCopiedRecipeId(id);
        setTimeout(() => {
          setCopiedRecipeId(null);
        }, 3000);
      })
      .catch((err) => {
        console.error('Error copying link:', err);
      });
  };

  const filteredRecipes = recipes.filter((recipe) => {
    if (buttonFilter === 'All') return true;
    if (buttonFilter === 'Meals') return recipe.type === 'meal';
    if (buttonFilter === 'Drinks') return recipe.type === 'drink';
    return true;
  });

  return (
    <div>
      <div className={ style.HeaderDone }>
        <img src={ DoneRecupies } alt="Done" className={ style.icon } />
        <h1 data-testid="page-title" className={ style.titleDone }>Done Recipes</h1>
        <div className={ style.GroupCategory }>
          <button
            className={ style.buttonsDone }
            onClick={ () => handleRecipes('All') }
            data-testid="filter-by-all-btn"
          >
            <img src={ all } alt="All" />
            <span className={ style.Title }>All</span>
          </button>
          <button
            className={ style.buttonsDone }
            onClick={ () => handleRecipes('Meals') }
            data-testid="filter-by-meal-btn"
          >
            <img src={ Meals } alt="Meals" />
            <span className={ style.Title }>Meals</span>

          </button>
          <button
            className={ style.buttonsDone }
            onClick={ () => handleRecipes('Drinks') }
            data-testid="filter-by-drink-btn"
          >
            <img src={ drink } alt="Drinks" />
            <span className={ style.Title }>Drinks</span>
          </button>
        </div>
      </div>
      <div className={ style.BodyDoneRecipes }>
        {filteredRecipes.map((recipe, index) => (
          <div key={ index } className={ style.CardDoneRecipes }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt={ `Foto de ${recipe.name}` }
                data-testid={ `${index}-horizontal-image` }
                className={ style.DoneRecipeImage }
              />
            </Link>
            <div className={ style.DoneRecipeInfo }>
              <Link
                to={ `/${recipe.type}s/${recipe.id}` }
                className={ style.DoneRecipeName }
              >
                <span data-testid={ `${index}-horizontal-name` }>
                  {recipe.name}
                </span>
              </Link>
              <div className={ style.DoneCategory }>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { recipe.type === 'drink'
                    ? recipe.alcoholicOrNot
                    : `${recipe.nationality} - ${recipe.category}`}
                </p>
                <p
                  className={ style.DoneDate }
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  {recipe.doneDate}
                </p>
                {recipe.tags.map((tagName, tagIndex) => (
                  <p
                    key={ tagIndex }
                    data-testid={ `${index}-${tagName}-horizontal-tag` }
                  >
                    { tagName }
                  </p>
                ))}
              </div>
              <button
                className={ style.ButtonSocial }
                onClick={ () => handleShareButtonClick(recipe.id, recipe.type) }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="Ícone de Compartilhamento"
                />
              </button>
              {copiedRecipeId === recipe.id && <p>Link copied!</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
