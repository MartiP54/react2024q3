import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import Content from '../components/content';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('Content Component', () => {
  beforeEach(() => {
    const mockUseRouter = useRouter as unknown as ReturnType<typeof vi.fn>;
    mockUseRouter.mockReturnValue({
      pathname: '/test',
      query: {},
      push: vi.fn(),
    });
  });

  it('renders correctly with given props', () => {
    const props = {
      initialData: [
        {
          uid: 'unique-id-1',
          name: 'Object 1',
          astronomicalObjectType: 'planet',
          location: { uid: 'location-1', name: 'Solar System' },
        }
      ],
      currentPage: 0,
      totalPages: 0,
      searchQuery: "",
    };
    render(<Content {...props} />);
    expect(screen.getByText('Object 1')).toBeInTheDocument();
  });

  it('shows "No results found" when initialData is empty', () => {
    const props = {
      initialData: [],
      currentPage: 0,
      totalPages: 0,
      searchQuery: "",
    };
    render(<Content {...props} />);
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });
});
