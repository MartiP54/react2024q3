import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import Pagination from '../components/Pagination';


vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('Pagination Component', () => {

  beforeEach(() => {
    const mockUseRouter = useRouter as unknown as ReturnType<typeof vi.fn>;
    mockUseRouter.mockReturnValue({
      pathname: '/test',
      query: {},
      push: vi.fn(),
    });
  });

  it('renders correct number of pages', () => {
    render(<Pagination currentPage={1} totalPages={3} />);
    const pageButtons = screen.getAllByRole('button');
    expect(pageButtons).toHaveLength(3);
  });

  it('disables the current page button', () => {
    render(<Pagination currentPage={2} totalPages={3} />);
    const currentPageButton = screen.getByText('2');
    expect(currentPageButton).toBeDisabled();
  });

  it('calls handlePageChange when a page is clicked', () => {
    const mockPush = useRouter().push;
    render(<Pagination currentPage={1} totalPages={3} />);
    const secondPageButton = screen.getByText('2');
    fireEvent.click(secondPageButton);
    expect(mockPush).toHaveBeenCalledWith(
      {
        pathname: '/test',
        query: { page: '2' },
      }
    );
  });
});
