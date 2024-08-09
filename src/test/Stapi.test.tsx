import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { useRouter } from 'next/router';
import Stapi from '../services/Stapi';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('Stapi component', () => {
  const mockPush = vi.fn();
  const mockUseRouter = useRouter as unknown as ReturnType<typeof vi.fn>;
  mockUseRouter.mockReturnValue({
    push: mockPush,
  });

  const mockData = [
    {
      uid: '1',
      name: 'Earth',
      astronomicalObjectType: 'Planet',
      location: { uid: '100', name: 'Solar System' },
    },
  ];

  it('renders correctly with data', () => {
    render(<Stapi initialData={mockData} searchQuery="" currentPage={1} totalPages={1} />);

    expect(screen.getByText('Earth')).toBeInTheDocument();
    expect(screen.getByText('Type: Planet')).toBeInTheDocument();
    expect(screen.getByText('Location: Solar System')).toBeInTheDocument();
  });

  it('handles card click and navigates', () => {
    render(<Stapi initialData={mockData} searchQuery="Earth" currentPage={1} totalPages={1} />);

    const card = screen.getByText('Earth');
    fireEvent.click(card);

    expect(mockPush).toHaveBeenCalledWith('/?searchQuery=Earth&page=1&id=1');
  });

  it('handles checkbox change', () => {
    render(<Stapi initialData={mockData} searchQuery="" currentPage={1} totalPages={1} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('handles close details', () => {
    render(
      <Stapi
        initialData={mockData}
        searchQuery="Earth"
        currentPage={1}
        totalPages={1}
        selectedId="1"
        detailsData={{ astronomicalObject: mockData[0] }}
      />
    );

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(mockPush).toHaveBeenCalledWith('/?searchQuery=Earth&page=1');
  });
});
