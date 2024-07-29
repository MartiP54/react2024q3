
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../components/errorBoundary';

describe('ErrorBoundary', () => {
  const FallbackComponent = <div>Something went wrong</div>;

  it('should render children without error', () => {
    function Child() {
  return <div>Child component</div>
}

    render(
      <ErrorBoundary fallback={FallbackComponent}>
        {() => <Child />}
      </ErrorBoundary>
    );

    expect(screen.getByText('Child component')).toBeInTheDocument();
  });

  it('should display fallback UI when an error is thrown', () => {
    function Child({ setError }: { setError: (error: Error) => void }) {
      React.useEffect(() => {
        setError(new Error('Test error'));
      }, [setError]);
      return null;
    }

    render(
      <ErrorBoundary fallback={FallbackComponent}>
        {(setError) => <Child setError={setError} />}
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong: Test error')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
