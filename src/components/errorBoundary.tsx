import React from 'react';

interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: (setError: (error: Error) => void) => React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string | null;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  handleResetError = () => {
    this.setState({ hasError: false, errorMessage: null });
  };

  setError = (error: Error) => {
    this.setState({ hasError: true, errorMessage: error.message });
  };

  render() {
    const { hasError, errorMessage } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      return (
        <div>
          <p>Something went wrong: {errorMessage}</p>
          {fallback}
          <button type="button" className="button" onClick={this.handleResetError}>Try Again</button>
        </div>
      );
    }

    return children(this.setError);
  }
}
