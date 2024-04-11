import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import LogoHeader from '../../images/LogoHeader.svg';
import profileIcon from '../../images/profileIcon.svg';

export default function HeaderNoSearch() {
  const navigate = useNavigate();

  return (
    <div className={ styles.header }>
      <img
        src={ LogoHeader }
        alt="Logo"
        className={ styles.LogoHeader }
      />
      <div className={ styles.search }>
        {/* // Sem Botao de pesquisa na pagina */}
        <button
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
