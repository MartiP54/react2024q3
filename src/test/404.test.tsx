import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import NotFound from '../pages/404';

describe('NotFound', () => {
  it('renders 404 message', () => {
    render(<NotFound />);
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });
});
