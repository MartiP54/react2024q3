import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from '../context/ThemeContext';
import ThemeSelector from '../components/ThemeSelector';

describe('ThemeSelector', () => {
  it('toggles theme', () => {
    const { getByLabelText } = render(
      <ThemeProvider>
        <ThemeSelector />
      </ThemeProvider>
    );

    fireEvent.click(getByLabelText('Dark'));
    expect(getByLabelText('Dark')).toBeChecked();

    fireEvent.click(getByLabelText('Light'));
    expect(getByLabelText('Light')).toBeChecked();
  });
});