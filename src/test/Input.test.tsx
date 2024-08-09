import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../components/Input/Input';

describe('Input Component', () => {
  it('renders correctly with given value', () => {
    render(<Input value="test value" onChange={() => {}} />);
    const inputElement = screen.getByPlaceholderText('Search');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('test value');
  });

  it('calls onChange handler when input value changes', () => {
    const handleChange = vi.fn();
    render(<Input value="" onChange={handleChange} />);
    const inputElement = screen.getByPlaceholderText('Search');
    fireEvent.change(inputElement, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
