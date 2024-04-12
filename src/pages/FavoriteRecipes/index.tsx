import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './FavoriteRecipes.module.css';
import BodyFavoriteRecipes from './BodyFavoriteRecipes';

export default function FavoriteRecipes() {
  return (
    <div className={ styles.layout }>
      <Header />
      <div className={ styles.body }>
        <BodyFavoriteRecipes />
      </div>
      <Footer />
    </div>
  );
}
