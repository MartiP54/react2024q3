import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, it, expect } from 'vitest';
import { store } from '../store';
import Flyout from '../components/Flyout';

describe('Flyout', () => {
  it('handles unselect all and download buttons', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    fireEvent.click(getByText('Unselect all'));
    fireEvent.click(getByText('Download'));

    expect(getByText('0 items are selected')).toBeInTheDocument();
  });
});