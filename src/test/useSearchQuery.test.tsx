import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import useSearchQuery from '../hooks/useSearchQuery';


function TestComponent({ storageKey }: { storageKey: string }) {
  const [query, setQuery] = useSearchQuery(storageKey);
  return (
    <div>
      <span data-testid="query">{query}</span>
      <button type="button" onClick={() => setQuery('newValue')}>Set Query</button>
    </div>
  );
}

describe('useSearchQuery', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should get initial value from localStorage', async () => {
    localStorage.setItem('testKey', 'initialValue');
    render(<TestComponent storageKey="testKey" />);
    
    await waitFor(() => {
      const queryElement = screen.getByTestId('query');
      expect(queryElement.textContent).toBe('initialValue');
    });
  });

  it('should update value in localStorage', async () => {
    render(<TestComponent storageKey="testKey" />);
    const button = screen.getByText('Set Query');
    fireEvent.click(button);

    await waitFor(() => {
      const storedValue = localStorage.getItem('testKey');
      const queryElement = screen.getByTestId('query');
      expect(storedValue).toBe('newValue');
      expect(queryElement.textContent).toBe('newValue');
    });
  });
});