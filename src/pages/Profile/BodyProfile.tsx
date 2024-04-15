import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';
import profileIcon from '../../images/Profile.svg';
import DoneRecupies from '../../images/DoneRecipes.svg';
import FavoriteRecipes from '../../images/FavoriteRecipes.svg';
import Logout from '../../images/logout.svg';
import About from '../../images/Design02/About.svg';

export default function BodyProfile() {
  const navigate = useNavigate();

  const usuario = localStorage.getItem('user');
  const emailUser = usuario ? JSON.parse(usuario).email : '';
  function handleLogout() {
    localStorage.clear();
    navigate('/');
  }

  // teste@teste.com
  return (
    <div className={ styles.pageProfile }>
      <div className={ styles.HeaderProfile }>
        <img src={ profileIcon } alt="profile" className={ styles.icon } />
        <h1 data-testid="page-title" className={ styles.titleProfile }>Profile</h1>
        <span
          data-testid="profile-email"
          className={ styles.emailProfile }
        >
          { emailUser }
        </span>
      </div>
      <div className={ styles.OptionsProfile }>
        <div>
          <button
            className={ styles.buttonsProfile }
            onClick={ () => navigate('/done-recipes') }
          >
            <img src={ DoneRecupies } alt="done" className={ styles.icon } />
            <span data-testid="profile-done-btn">Done Recipes</span>
          </button>
        </div>
        <div className={ styles.OptionsBox }>
          <button
            className={ styles.buttonsProfile }
            onClick={ () => navigate('/favorite-recipes') }
          >
            <img src={ FavoriteRecipes } alt="favorite" className={ styles.icon } />
            <span data-testid="profile-favorite-btn">Favorite Recipes</span>
          </button>
        </div>
        <div>
          <button
            className={ styles.buttonsProfile }
            onClick={ handleLogout }
            data-testid="profile-logout-btn"
          >
            <img src={ Logout } alt="logout" className={ styles.icon } />
            <span>Logout</span>
          </button>
        </div>
      </div>
      <button
        className={ styles.buttonsAbout }
        onClick={ () => navigate('/about-us') }
        data-testid="About-btn"
      >
        <img src={ About } alt="About" />
        <span>About Us</span>
      </button>
    </div>
  );
}
