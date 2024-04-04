import { useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';
import drinkIcon from '../../images/drinkIcon2.svg';
import mealIcon from '../../images/mealIcon2.svg';

export default function FooterLayout() {
  const navigate = useNavigate();

  return (
    <div data-testid="footer" className={ styles.footer }>
      <button
        onClick={ () => navigate('/drinks') }
        className={ styles.footerButton }
      >
        <img
          src={ drinkIcon }
          alt="drinks-bottom-btn"
          data-testid="drinks-bottom-btn"
          className={ styles.menuIcon }
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
  );
}
