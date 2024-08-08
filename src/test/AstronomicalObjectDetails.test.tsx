import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import AstronomicalObjectDetails from '../pages/details/[id]';

describe('AstronomicalObjectDetails', () => {
  it('renders loading state initially', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AstronomicalObjectDetails />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Loading details...')).toBeInTheDocument();
  });
});