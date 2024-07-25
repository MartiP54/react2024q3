import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '../components/Button/Button';

describe('Button', () => {
  it('renders children and handles click event', () => {
    const handleClick = vi.fn();
    const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = getByText('Click me');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalled();
  });
});
