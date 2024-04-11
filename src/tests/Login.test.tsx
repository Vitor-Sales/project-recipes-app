import React from 'react';
import { screen, waitFor, fireEvent } from '@testing-library/react';
// import { afterEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import renderWithContext from './renderWithContext';
import renderWithRouter from './renderWithRouter';

// import Login from '../pages/Login';

// beforeEach(async () => {
//   vi.spyOn(global, 'fetch').mockResolvedValue(await mockFetch());
// });

// afterEach(() => {
//   vi.restoreAllMocks();
// });

const ROTA_MEALS = '/meals';
const validEmail = 'email@teste.com';
const validPass = 'senha123';

const emailInput = 'email-input';
const passwordInput = 'password-input';
const buttonSubmit = 'login-submit-btn';

describe('Teste da página Login.js', () => {
  it('Verifica se redenriza', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-submit-btn')).toBeInTheDocument();
  });

  it('Verifica insere valores no campo', () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId(emailInput);
    expect(email).toBeInTheDocument();

    const password = screen.getByTestId(passwordInput);
    expect(password).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();

    expect(button).toBeDisabled();
  });

  it('Verifica se o botão permanece desabilitado caso os campos não sejam válidos', async () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, 'alguememail.com');
    userEvent.type(password, '123456');
    expect(button).toBeDisabled();

    userEvent.clear(email);
    userEvent.type(password, validPass);
    expect(button).toBeDisabled();

    userEvent.type(email, validEmail);
    userEvent.clear(password);
    expect(button).toBeDisabled();

    userEvent.type(email, validEmail);
    userEvent.type(password, '12345');
    expect(button).toBeDisabled();

    userEvent.type(email, 'alguem@email');
    userEvent.type(password, validPass);
    expect(button).toBeDisabled();

    userEvent.type(email, '@email.com');
    userEvent.type(password, validPass);
    expect(button).toBeDisabled();

    userEvent.clear(email);
    userEvent.clear(password);
    expect(button).toBeDisabled();
  });

  it('Verifica se o botão de entrar redireciona para a página de carteira', async () => {
    renderWithRouter(<App />, { route: '/' });

    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const button = screen.getByTestId(buttonSubmit);

    await userEvent.type(email, validEmail);
    await userEvent.type(password, validPass);

    await userEvent.click(button);

    waitFor(() => expect(global.window.location.pathname).toEqual(ROTA_MEALS));
  });

  it('completa o fluxo de login corretamente', async () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const btnEnter = screen.getByTestId(buttonSubmit);

    fireEvent.change(inputEmail, { target: { value: validEmail } });
    fireEvent.change(inputPassword, { target: { value: validPass } });
    expect(inputEmail).toHaveValue(validEmail);
    expect(inputPassword).toHaveValue(validPass);
    expect(btnEnter).not.toBeDisabled();
    fireEvent.click(btnEnter);
    const mealScreenTitle = screen.getByRole('heading', { name: /meals/i });
    expect(mealScreenTitle).toBeInTheDocument();
  });
});
