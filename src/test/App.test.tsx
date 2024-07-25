import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../App';
import { store } from '../store';

describe('App component', () => {
  it('renders Home component by default', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('renders NotFound component for unknown routes', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/unknown-route']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/404 - page not found/i)).toBeInTheDocument();
  });
});