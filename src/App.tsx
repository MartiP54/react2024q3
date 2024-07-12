import './App.css';
import { useState } from 'react';
import Header from './components/header';
import Content from './components/content';
import ErrorBoundary from './components/errorBoundary';


export default function App () {
  const [query, setQuery] = useState<string>(localStorage.getItem('lastSearchMarti') || '');
  const [searchKey, setSearchKey] = useState<number>(0);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setSearchKey(prevKey => prevKey + 1);
    localStorage.setItem('lastSearchMarti', newQuery);
  };

    return (
      <div className="app_wrapper">
        <ErrorBoundary fallback={<div>Sorry for the inconvenience. An error occurred, try loading the page again.</div>}>
          {(setError) => (
            <>
              <Header onSearch={handleSearch} initialQuery={query} onError={setError} />
              <Content searchKey={searchKey} />
            </>
          )}
        </ErrorBoundary>
        </div>
    );

}