import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NotFound from '../pages/NotFound';

describe('NotFound', () => {
  it('renders correctly', () => {
    render(<NotFound />);
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });
});