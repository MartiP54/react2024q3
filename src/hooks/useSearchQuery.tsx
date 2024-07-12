import { useState, useEffect } from 'react';

export default function useSearchQuery (key: string) {
  const [query, setQuery] = useState(() => localStorage.getItem(key) || '');

  useEffect(() => {
      localStorage.setItem(key, query);
  }, [key, query]);

  return [query, setQuery] as const;
};