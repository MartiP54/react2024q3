import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Flyout from '../components/Flyout';
import { AstronomicalObject } from '../services/astronomicalObjectsApi';

const mockSelectedObjects: AstronomicalObject[] = [
  { uid: '1', name: 'Mars', astronomicalObjectType: 'Planet', location: null },
];

describe('Flyout Component', () => {
  it('renders selected objects correctly', () => {
    render(<Flyout selectedObjects={mockSelectedObjects} onUnselectAll={() => {}} />);
    const objectElement = screen.getByText('Mars');
    expect(objectElement).toBeInTheDocument();
  });

  it('calls onUnselectAll when "Unselect All" button is clicked', () => {
    const handleUnselectAll = vi.fn();
    render(<Flyout selectedObjects={mockSelectedObjects} onUnselectAll={handleUnselectAll} />);
    const button = screen.getByText('Unselect All');
    fireEvent.click(button);
    expect(handleUnselectAll).toHaveBeenCalledTimes(1);
  });
});
