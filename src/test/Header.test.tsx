import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from '../components/header';


describe('Header', () => {
  it('handles search and error buttons', () => {
    const handleSearch = vi.fn();
    const handleError = vi.fn();

    const { getByText } = render(
      <Header onSearch={handleSearch} initialQuery="" onError={handleError} />
    );

    fireEvent.click(getByText('Search'));
    fireEvent.click(getByText('Throw Error'));

    expect(handleSearch).toHaveBeenCalled();
    expect(handleError).toHaveBeenCalled();
  });
});