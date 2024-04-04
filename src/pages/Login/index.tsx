import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Validation from '../../assets/Validation';

import styles from './Login.module.css';
import LogoBig from '../../images/logoBig.svg';
import tomates from '../../images/tomates.svg';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Validatebtm = Validation(email, password);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/meals');
  };

  return (
    <div className={ styles.meals }>
      <div className={ styles.headerLogin }>
        <img src={ LogoBig } alt="Logo" />
      </div>
      <div className={ styles.tomates }>
        <img src={ tomates } alt="Logo" />
      </div>
      <form onSubmit={ handleSubmit } className={ styles.login }>
        <span className={ styles.loginTitle }>LOGIN</span>
        <input
          type="email"
          placeholder="Email"
          data-testid="email-input"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          className={ styles.loginInput }
        />
        <input
          type="password"
          placeholder="Password"
          data-testid="password-input"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          className={ styles.loginInput }
        />
        <button
          className={ styles.loginButton }
          data-testid="login-submit-btn"
          disabled={ !Validatebtm }
        >
          ENTRAR
        </button>
      </form>
    </div>
  );
}
