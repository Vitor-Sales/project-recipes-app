import Header from '../../components/Header/HeaderNoSearch';
import Footer from '../../components/Footer';
import styles from './DoneRecipes.module.css';
import BodyDoneRecipes from './BodyDoneRecipes';

export default function DoneRecipes() {
  return (
    <div className={ styles.layout }>
      <Header />
      <div className={ styles.body }>
        <BodyDoneRecipes />
      </div>
      <Footer />
    </div>
  );
}
