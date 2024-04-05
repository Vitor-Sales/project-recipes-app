import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeProvider from '../context/RecipeProvider';

const renderWithContext = (ui: JSX.Element) => {
  return {
    ...render(
      <RecipeProvider>
        { ui }
      </RecipeProvider>,
    ),
    user: userEvent.setup(),
  };
};

export default renderWithContext;
