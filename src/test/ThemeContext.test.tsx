import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

describe('ThemeContext', () => {
  it('should provide the default theme', () => {
    function TestComponent() {
      const { theme } = useTheme();
      return <div>{theme}</div>;
    }

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('light')).toBeInTheDocument();
  });

  it('should throw an error if useTheme is used outside ThemeProvider', () => {
    function TestComponent() {
      const { theme } = useTheme();
      return <div>{theme}</div>;
    }

    expect(() => render(<TestComponent />)).toThrowError('error useTheme');
  });

  it('should allow changing the theme', async () => {
    function TestComponent() {
      const { theme, setTheme } = useTheme();
      return (
        <div>
          <span>{theme}</span>
          <button type='button' onClick={() => setTheme('dark')}>Change to Dark</button>
        </div>
      );
    }

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByText('Change to Dark');
    fireEvent.click(button);

    await waitFor(() => expect(screen.getByText('dark')).toBeInTheDocument());
  });
});
