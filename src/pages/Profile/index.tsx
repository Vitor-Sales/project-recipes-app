import Header from '../../components/Header/HeaderNoSearch';
import Footer from '../../components/Footer';
import styles from './Profile.module.css';
import BodyProfile from './BodyProfile';

export default function Profile() {
  return (
    <div className={ styles.layout }>
      <Header />
      <div className={ styles.body }>
        <BodyProfile />
      </div>
      <Footer />
    </div>
  );
}
