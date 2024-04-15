import { useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';
import drinkIcon from '../../images/Design02/drinkIcon.svg';
import mealIcon from '../../images/Design02/mealIcon.svg';
import DoneRecupies from '../../images/Design02/DoneRecipes.svg';
import FavoriteRecipes from '../../images/Design02/FavoriteRecipes.svg';
import profileIcon from '../../images/Design02/Profile.svg';

export default function FooterLayout() {
  const navigate = useNavigate();

  return (
    <div data-testid="footer" className={ styles.footer }>
      {/* Left */}
      <div className={ styles.footerLeft }>
        <button
          onClick={ () => navigate('/drinks') }
          className={ styles.footerButton }
        >
          <img
            src={ drinkIcon }
            alt="drinks-bottom-btn"
            data-testid="drinks-bottom-btn"
            className={ styles.menuIcon01 }
          />
        </button>
        <button
          onClick={ () => navigate('/meals') }
          className={ styles.footerButton }
        >
          <img
            src={ mealIcon }
            alt="meals-bottom-btn"
            data-testid="meals-bottom-btn"
            className={ styles.menuIcon }
          />
        </button>
      </div>

      {/* Center */}
      <div className={ styles.footerCenter }>
        <button
          type="button"
          onClick={ () => navigate('/profile') }
          className={ styles.footerButton }
          data-testid="profile-bottom-btn"
        >
          <img
            src={ profileIcon }
            alt="profile"
            className={ styles.menuIconCener }
          />
        </button>
      </div>

      {/* Right */}
      <div className={ styles.footerRight }>
        <button
          className={ styles.footerButton }
          onClick={ () => navigate('/done-recipes') }
          data-testid="done-recipes-btn"
        >
          <img src={ DoneRecupies } alt="done" className={ styles.menuIcon } />
        </button>
        <button
          className={ styles.footerButton }
          onClick={ () => navigate('/favorite-recipes') }
          data-testid="favorite-recipes-btn"
        >
          <img src={ FavoriteRecipes } alt="favorite" className={ styles.menuIcon } />
        </button>
      </div>
    </div>
  );
}
