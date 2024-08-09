import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import React from 'react';
import mockRouter from 'next-router-mock';
import { Router } from 'next/router';
import MyApp from '../pages/_app';

interface MockedNextRouter extends Partial<Router> {
  setCurrentUrl: (url: string) => void;
}

function TestComponent() {
  return <div>Test Component</div>;
}

describe('_app', () => {
  it('renders the app with ThemeProvider and ThemeSelector', () => {
    const pageProps = {};

    const router = mockRouter as unknown as MockedNextRouter;
    router.setCurrentUrl('/');

    const { container } = render(
      <MyApp Component={TestComponent} pageProps={pageProps} router={router as unknown as Router} />
    );

    expect(container.querySelector('.theme-light')).toBeInTheDocument();
    expect(container.querySelector('div')).toHaveTextContent('Test Component');
  });
});
