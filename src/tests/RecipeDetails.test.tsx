import { screen } from '@testing-library/dom';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe.skip('Tela de Detalhes', () => {
  it('Renderização dos detalhes da COMIDA', async () => {
    renderWithRouter(<App />, { route: '/meals/52977' });
    const title = await screen.findByText(/corba/i);
    const recipeImage = await screen.findByTestId('recipe-photo');
    const category = await screen.findByTestId('recipe-category');
    const firstIngredient = await screen.findByText(/lentils 1 cup/i);
    const lastIngredient = await screen.findByText(/sea salt pinch/i);
    const instructions = await screen.findByText(/and the onion with a pinch of/i);
    const video = await screen.findByTestId('video');

    expect(title).toBeInTheDocument();
    expect(recipeImage).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(firstIngredient).toBeInTheDocument();
    expect(lastIngredient).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(video).toBeInTheDocument();
  });

  it('Renderização dos botões na tela de BEBIDA', async () => {
    renderWithRouter(<App />, { route: '/meals/52977' });
    const buttons = await screen.findAllByRole('button');
    const shareBtn = await screen.findByTestId('share-btn');
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    const startBtn = await screen.findByRole('button', { name: /start recipe/i });

    expect(buttons).toHaveLength(3);
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(startBtn).toBeInTheDocument();
  });

  it('Renderização dos detalhes da BEBIDA', async () => {
    renderWithRouter(<App />, { route: '/drinks/11007' });
    const title = await screen.findByText(/Margarita/i);
    const recipeImage = await screen.findByTestId('recipe-photo');
    const category = await screen.findByTestId('recipe-category');
    const firstIngredient = await screen.findByText('Tequila 1 1/2 oz');
    const lastIngredient = await screen.findByText(/Salt null/i);
    const instructions = await screen.findByText(/present to the lips of the imbiber/i);

    expect(title).toBeInTheDocument();
    expect(recipeImage).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(firstIngredient).toBeInTheDocument();
    expect(lastIngredient).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
  });

  it('Renderização dos botões na tela de COMIDA', async () => {
    renderWithRouter(<App />, { route: '/drinks/11007' });
    const buttons = await screen.findAllByRole('button');
    const shareBtn = await screen.findByTestId('share-btn');
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    const startBtn = await screen.findByRole('button', { name: /start recipe/i });

    expect(buttons).toHaveLength(3);
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(startBtn).toBeInTheDocument();
  });
});
