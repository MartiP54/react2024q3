import { useRouter } from 'next/router';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const { pathname, query } = router;

  const handlePageChange = async (page: number) => {
    try {
      await router.push({
        pathname,
        query: { ...query, page: page.toString() },
      });
    } catch (err) {
      console.error('Failed to change page:', err);
    }
  };

  const pages: JSX.Element[] = [];
  for (let i = 1; i <= totalPages; i += 1) {
    pages.push(
      <button
        type="button"
        key={i}
        onClick={() => { handlePageChange(i).catch(err => console.error(err)); }}
        disabled={i === currentPage}
      >
        {i}
      </button>
    );
  }

  return <div className="pagination">{pages}</div>;
}
