import { screen } from '@testing-library/dom';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Tela de Detalhes', () => {
  it('Renderização dos detalhes da COMIDA', async () => {
    renderWithRouter(<App />, { route: '/meals/52977' });
    const title = await screen.findByText(/corba/i);
    const recipeImage = await screen.findByTestId('recipe-photo');
    const category = await screen.findByTestId('recipe-category');
    const firstIngredient = await screen.findByText(/lentils 1 cup/i);
    const lastIngredient = await screen.findByText(/sea salt pinch/i);
    const instructions = await screen.findByText(/and the onion with a pinch of/i);
    const video = await screen.findByTestId('video');
    // const firstRecommendation = await screen.findByTestId('1-recommendation-title');
    // const thirdRecommendation = await screen.findByTestId('2-recommendation-title');

    expect(title).toBeInTheDocument();
    expect(recipeImage).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(firstIngredient).toBeInTheDocument();
    expect(lastIngredient).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(video).toBeInTheDocument();
    // expect(firstRecommendation).toBeInTheDocument();
    // expect(thirdRecommendation).not.toBeInTheDocument();
  });

  it('Renderização dos botôes', async () => {
    renderWithRouter(<App />, { route: '/meals/52977' });
    const buttons = await screen.findAllByRole('button');
    const shareBtn = await screen.findByTestId('share-btn');
    const favoriteBtn = await screen.findByTestId('favorite-btn');

    expect(buttons).toHaveLength(3);
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
  });
});
