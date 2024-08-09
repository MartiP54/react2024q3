import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/header';

describe('Header Component', () => {
  it('renders input with initial query', () => {
    render(<Header initialQuery="Mars" onSearch={() => {}} />);
    const inputElement = screen.getByPlaceholderText('Search');
    expect(inputElement).toHaveValue('Mars');
  });

  it('calls onSearch with correct value when search button is clicked', () => {
    const handleSearch = vi.fn();
    render(<Header initialQuery="Mars" onSearch={handleSearch} />);
    const buttonElement = screen.getByText('Search');
    fireEvent.click(buttonElement);
    expect(handleSearch).toHaveBeenCalledWith('Mars');
  });
});
