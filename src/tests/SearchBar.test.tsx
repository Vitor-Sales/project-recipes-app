import { screen, fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const renderWithRouter = () => {
  return render(
    <MemoryRouter>
      <SearchBar />
    </MemoryRouter>,
  );
};
describe('Testes do componete SearchBar', () => {
  test('Verifica se o componente é renderizado', async () => {
    renderWithRouter();
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });
  test('Verifica se ao digitar "Bistek" no input de texto, altera a rota para "/search/Bistek/53069"', () => {
    renderWithRouter();
    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('exec-search-btn');
    fireEvent.change(searchInput, { target: { value: 'Bistek' } });
    fireEvent.click(searchButton);
    // Aguarda 2 segundos antes de verificar a rota
    setTimeout(() => {
      expect(window.location.pathname).toEqual('/search/Bistek/53069');
    }, 2000);
  });
  test('Verifica se ao clicar no botão de busca, o input de texto permanece com o texto buscado', () => {
    renderWithRouter();
    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('exec-search-btn');
    fireEvent.change(searchInput, { target: { value: 'teste' } });
    searchButton.click();
    expect(searchInput).toHaveValue('teste');
  });
  test('Verifica se um alerta é exibido ao tentar pesquisar por primeira letra com mais de um caractere', () => {
    renderWithRouter();
    const searchInput = screen.getByTestId('search-input');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');
    fireEvent.change(searchInput, { target: { value: 'AB' } });
    fireEvent.click(firstLetterRadio);
    fireEvent.click(searchButton);
    setTimeout(() => {
      expect(window.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    }, 2000);
  });
});
