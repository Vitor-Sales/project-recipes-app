import HeaderDrinks from './HeaderDrinks';
import BodyDrinks from './BodyDrinks';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './Drinks.module.css';

export default function Drinks() {
  return (
    <div className={ styles.layout }>
      <Header />
      <div className={ styles.body }>
        <div className={ styles.pageDrinks }>
          <HeaderDrinks />
          <BodyDrinks />
        </div>
      </div>
      <Footer />
    </div>
  );
}
