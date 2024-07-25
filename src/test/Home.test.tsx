import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, it } from 'vitest';
import { store } from '../store';
import Home from '../pages/Home';

describe('Home', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
  });
});