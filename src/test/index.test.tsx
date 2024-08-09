import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { IncomingMessage, ServerResponse } from 'http';
import Home, { getServerSideProps } from '../pages/index';


interface QueryParams extends ParsedUrlQuery {
  searchQuery?: string;
  page?: string;
  id?: string;
}

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const mockPush = vi.fn();
const mockUseRouter = useRouter as unknown as ReturnType<typeof vi.fn>;
mockUseRouter.mockReturnValue({
  push: mockPush,
});

describe('Home component', () => {
  it('renders the Header and Content components', () => {
    render(<Home initialData={[]} query="" page={1} totalPages={1} />);

    expect(screen.getByText(/No results found/i)).toBeInTheDocument();
  });
});

describe('getServerSideProps', () => {
  it('returns default props on failure', async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      } as Response)
    );

    global.fetch = mockFetch;

    const mockContext: GetServerSidePropsContext<QueryParams> = {
      query: {},
      req: {
        cookies: {},
      } as IncomingMessage & {
        cookies: Partial<{ [key: string]: string }>;
      },
      res: {} as ServerResponse,
      params: undefined,
      resolvedUrl: '',
      locale: undefined,
      locales: undefined,
      defaultLocale: undefined,
    };

    const result = await getServerSideProps(mockContext);

    expect(result).toEqual({
      props: { initialData: [], query: '', page: 1, totalPages: 0 },
    });
  });
});
