
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Details from '../pages/details/[id]';

describe('Details Component', () => {
  it('renders correctly with provided data', () => {
    render(
      <Details
        data={{
          astronomicalObject: {
            uid: '1',
            name: 'Object 1',
            astronomicalObjectType: 'Type 1',
            location: { uid: '2', name: 'Location 1' },
            astronomicalObjects: [{ uid: '3', name: 'Sub-object 1', astronomicalObjectType: 'Sub-type 1', location: null }],
          }
        }}
        onClose={() => {}}
      />
    );

    expect(screen.getByText('Object 1')).toBeInTheDocument();
    expect(screen.getByText('Type: Type 1')).toBeInTheDocument();
    expect(screen.getByText('Location: Location 1')).toBeInTheDocument();
    expect(screen.getByText('Sub-objects:')).toBeInTheDocument();
  });

  it('handles close button click', () => {
    const handleClose = vi.fn();

    render(
      <Details
        data={{
          astronomicalObject: {
            uid: '1',
            name: 'Object 1',
            astronomicalObjectType: 'Type 1',
            location: null,
            astronomicalObjects: [],
          }
        }}
        onClose={handleClose}
      />
    );

    fireEvent.click(screen.getByText('Close'));
    expect(handleClose).toHaveBeenCalled();
  });
});
