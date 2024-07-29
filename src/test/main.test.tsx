import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import App from '../App';
import { store } from '../store';

describe('Main entry point', () => {
  it('renders the Home component by default', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.getByText(/loading astronomical objects/i)).toBeInTheDocument();
  });

  it('renders the NotFound component for unknown routes', () => {
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