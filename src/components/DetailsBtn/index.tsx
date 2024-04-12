import { useNavigate, useLocation, useParams } from 'react-router-dom';
import style from './DetailBtn.module.css';

function DetailsBtn({ idRecipe }: { idRecipe: string }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();

  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
  const mealsProgress = Object.keys(inProgress.meals || {}) || [];
  const drinksProgress = Object.keys(inProgress.drinks || {}) || [];
  const verification = mealsProgress.some((idProgress) => idProgress === idRecipe)
     || drinksProgress.some((idProgress) => idProgress === idRecipe);

  const handleClick = () => {
    if (pathname.includes('drinks')) {
      navigate(`/drinks/${id}/in-progress`);
    } else {
      navigate(`/meals/${id}/in-progress`);
    }
  };

  return (
    <button
      data-testid="start-recipe-btn"
      onClick={ handleClick }
      className={ style.startBtn }
    >
      {verification
        ? 'Continue Recipe' : 'Start Recipe'}
    </button>
  );
}

export default DetailsBtn;
