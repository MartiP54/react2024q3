

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';
import { store } from '../store';

describe('Home', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetAllMocks();
  });

  it('renders Header and Content components', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('loads last search query from localStorage and sets it in the state', () => {
    localStorage.setItem('lastSearchMarti', 'Mars');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(store.getState().search.query).toBe('Mars');
    expect(store.getState().pagination.currentPage).toBe(1);
  });

  it('handles search query submission', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByRole('searchbox');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'Jupiter' } });
    fireEvent.click(button);

    expect(store.getState().search.query).toBe('Jupiter');
    expect(localStorage.getItem('lastSearchMarti')).toBe('Jupiter');
    expect(store.getState().pagination.currentPage).toBe(1);
  });

  it('displays error message and allows resetting error state', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    const errorButton = screen.getByText('Throw Error');
    fireEvent.click(errorButton);

    expect(screen.getByText('Sorry for the inconvenience. An error occurred, try loading the page again.')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong: Test error')).toBeInTheDocument();

    const tryAgainButton = screen.getByText('Try Again');
    fireEvent.click(tryAgainButton);

    expect(screen.queryByText('Something went wrong: Test error')).not.toBeInTheDocument();
  });
});
