import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import RecipeContext from '../../context/RecipeContext';
import styles from './Header.module.css';
import LogoHeader from '../../images/LogoHeader.svg';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

export default function HeaderLayout() {
  const navigate = useNavigate();
  const { searchToggle } = useContext(RecipeContext);
  const location = useLocation().pathname;
  const [showSearc, setShowSearch] = useState(false);

  useEffect(() => {
    if (location.includes('meals') || location.includes('drinks')) {
      setShowSearch(true);
    }
  }, [location, showSearc]);

  return (
    <div className={ styles.header }>
      <img
        src={ LogoHeader }
        alt="Logo"
        className={ styles.LogoHeader }
      />
      <div className={ styles.search }>

        {showSearc && (
          <button
            type="button"
            onClick={ searchToggle }
            className={ styles.headerButton }
          >
            <img
              src={ searchIcon }
              alt="profile"
              className={ styles.searchIcon }
              data-testid="search-top-btn"
            />
          </button>
        )}
        <button
          type="button"
          onClick={ () => navigate('/profile') }
          className={ styles.headerButton }
        >
          <img
            src={ profileIcon }
            alt="profile"
            className={ styles.profileIcon }
            data-testid="profile-top-btn"
          />
        </button>
      </div>
    </div>
  );
}
