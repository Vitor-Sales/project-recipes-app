import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DoneRecipesType } from '../../types';
import Header from '../../components/Header/HeaderNoSearch';
import Footer from '../../components/Footer';
import styles from './DoneRecipes.module.css';
import BodyDoneRecipes from './BodyDoneRecipes';
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
    <div className={ styles.layout }>
      <Header />
      <div className={ styles.body }>
        <BodyDoneRecipes />

        <button
          onClick={ () => handleRecipes('All') }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          onClick={ () => handleRecipes('Meals') }
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          onClick={ () => handleRecipes('Drinks') }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
        {filteredRecipes.map((recipe, index) => (
          <div key={ index }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt={ `Foto de ${recipe.name}` }
                data-testid={ `${index}-horizontal-image` }
                height="200px"
              />
              <h2
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </h2>
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              { recipe.type === 'drink'
                ? recipe.alcoholicOrNot : `${recipe.nationality} - ${recipe.category}`}
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>
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
            <button onClick={ () => handleShareButtonClick(recipe.id, recipe.type) }>
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="Ícone de Compartilhamento"
              />
            </button>
            {copiedRecipeId === recipe.id && <p>Link copied!</p>}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
