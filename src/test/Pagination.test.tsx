import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Pagination from '../components/Pagination';

describe('Pagination', () => {
  it('handles page change', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Pagination currentPage={1} totalPages={5} />
      </MemoryRouter>
    );

    fireEvent.click(getByText('2'));
    expect(getByText('1')).toBeDisabled();
  });
});