import React from 'react';
import { screen } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import renderWithRouter from './renderWithRouter';

describe('Testes do componete SearchBar', () => {
  it('Verifica se app redenriza SearchBar', () => {
    renderWithRouter(<SearchBar />);
    const searchInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    expect(searchInput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
  });
});
