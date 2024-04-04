import HeaderMeals from './Header';
import BodyMeals from './BodyMeals';
import styles from './Meals.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Meals() {
  return (
    <div className={ styles.layout }>
      <Header />
      <div className={ styles.body }>
        <div className={ styles.pageMeals }>
          <HeaderMeals />
          <BodyMeals />
        </div>
      </div>
      <Footer />
    </div>

  );
}
