import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Content from '../components/content';
import ErrorBoundary from '../components/errorBoundary';
import useSearchQuery from '../hooks/useSearchQuery';

export default function Home () {
  const [query, setQuery] = useSearchQuery('lastSearchMarti');
  const [searchKey, setSearchKey] = useState(0);
  const navigate = useNavigate();

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    localStorage.setItem('lastSearchMarti', newQuery);
    setSearchKey(prevKey => prevKey + 1);
    navigate('?page=1');
  };

  useEffect(() => {
    const savedQuery = localStorage.getItem('lastSearchMarti');
    if (savedQuery) {
      setQuery(savedQuery);
      setSearchKey(prevKey => prevKey + 1);
      navigate('?page=1');
    }
  }, [setQuery, navigate]);

  return (
    <div className="app_wrapper">
      <ErrorBoundary fallback={<div>Sorry for the inconvenience. An error occurred, try loading the page again.</div>}>
        {(setError) => (
          <>
            <Header onSearch={handleSearch} initialQuery={query} onError={setError} />
            <Content searchKey={searchKey} searchQuery={query} />
          </>
        )}
      </ErrorBoundary>
    </div>
  );
}
