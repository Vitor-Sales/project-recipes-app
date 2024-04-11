import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Header from '../components/Header';
import HeaderNoSearch from '../components/Header/HeaderNoSearch';

const botaoPerfilId = 'profile-top-btn';
const botaoPesquisaId = 'search-top-btn';

describe('Componente de Cabeçalho Header (com pesquisa) ', () => {
  it('Redireciona para a página de perfil quando o botão de perfil é clicado', () => {
    const { getByTestId } = renderWithRouter(<Header />);
    const botaoPerfil = getByTestId(botaoPerfilId);
    fireEvent.click(botaoPerfil);
  });

  it('Renderiza o botão de perfil quando showProfileIcon é verdadeiro', () => {
    const { getByTestId } = renderWithRouter(<Header />);
    expect(getByTestId(botaoPerfilId)).toBeInTheDocument();
  });

  it('Renderiza o botão de pesquisa quando showSearchIcon é verdadeiro', () => {
    const { getByTestId } = renderWithRouter(<Header />);
    expect(getByTestId(botaoPesquisaId)).toBeInTheDocument();
  });
});

//
// Testes do componente de cabeçalho sem pesquisa
//

describe('Componente de Cabeçalho Header - HeaderNoSearch (Sem pesquisa) ', () => {
  it('Redireciona para a página de perfil quando o botão de perfil é clicado', () => {
    const { getByTestId } = renderWithRouter(<HeaderNoSearch />);
    const botaoPerfil = getByTestId(botaoPerfilId);
    fireEvent.click(botaoPerfil);
  });

  it('Renderiza o botão de perfil quando showProfileIcon é verdadeiro', () => {
    const { getByTestId } = renderWithRouter(<HeaderNoSearch />);
    expect(getByTestId(botaoPerfilId)).toBeInTheDocument();
  });
});
