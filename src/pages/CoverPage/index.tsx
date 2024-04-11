import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CoverPage.css';
import logoApp from '../../images/logoApp.svg';
import logoTrybe from '../../images/logoTrybe.svg';
import linkedinTile from '../../images/linkedinTile.svg';

export default function CoverPage() {
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <form onSubmit={ handleSubmit } className="meals">
      <div className="headerInitial">
        <img src={ logoTrybe } alt="Logo" className="LogoTrybe" />
        <span className="text">
          Trabalho desenvolvido pelo Grupo 05
        </span>
        <span className="text">:: Turma 38 ::</span>

        <div className="Grupo">
          <div className="member">
            <img src="https://ca.slack-edge.com/TMDDFEPFU-U04MJ07KGTZ-720acd895d8a-512" alt="Grupo" className="foto" />
            <p className="memberName">André</p>
            <img src={ linkedinTile } alt="Logo" className="linkedinTile" />
          </div>
          <div className="member">
            <img src="https://ca.slack-edge.com/TMDDFEPFU-U05KN9ELPC5-6bc0eb5c1cc9-512" alt="Grupo" className="foto" />
            <p className="memberName">Joao</p>
            <img src={ linkedinTile } alt="Logo" className="linkedinTile" />
          </div>
          <div className="member">
            <img src="https://ca.slack-edge.com/TMDDFEPFU-U03RYNQUJ49-46d115669880-512" alt="Grupo" className="foto" />
            <p className="memberName">Fábio</p>
            <img src={ linkedinTile } alt="Logo" className="linkedinTile" />
          </div>
          <div className="member">
            <img src="https://ca.slack-edge.com/TMDDFEPFU-U05VAT33DUZ-9a23f71cb223-512" alt="Grupo" className="foto" />
            <p className="memberName">Jose</p>
            <img src={ linkedinTile } alt="Logo" className="linkedinTile" />
          </div>
          <div className="member">
            <img src="https://ca.slack-edge.com/TMDDFEPFU-U05PTLE8V71-353636e4b59a-512" alt="Grupo" className="foto" />
            <p className="memberName">Paulo</p>
            <img src={ linkedinTile } alt="Logo" className="linkedinTile" />
          </div>
          <div className="member">
            <img src="https://ca.slack-edge.com/TMDDFEPFU-U05QLRCGVC1-0ee80e4994c6-512" alt="Grupo" className="foto" />
            <p className="memberName">Vitor</p>
            <img src={ linkedinTile } alt="Logo" className="linkedinTile" />
          </div>
        </div>
        <p className="memberName">Ponto Focal:</p>
        <div className="member">
          <img src="https://ca.slack-edge.com/TMDDFEPFU-U01KPQE42F7-034fef6814c6-512" alt="Grupo" className="foto" />
          <p className="memberName">Joicy</p>
          <img src={ linkedinTile } alt="Logo" className="linkedinTile" />
        </div>

      </div>
      <div className="bodyInitial">
        <span>👇👇👇</span>
        <button
          className="logoApp"
        >
          <img src={ logoApp } alt="Logo" />
        </button>
        <h1 className="NameApp">Recipes App</h1>
      </div>
    </form>
  );
}
