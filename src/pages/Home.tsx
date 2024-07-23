
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Content from '../components/content';
import ErrorBoundary from '../components/errorBoundary';
import { RootState } from '../store';
import { setCurrentPage } from '../slice/paginationSlice';
import { setSearchQuery } from '../slice/searchSlice';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useSelector((state: RootState) => state.search.query);

  const handleSearch = (newQuery: string) => {
    dispatch(setSearchQuery(newQuery));
    localStorage.setItem('lastSearchMarti', newQuery);
    dispatch(setCurrentPage(1));
    navigate('?page=1');
  };

  useEffect(() => {
    const savedQuery = localStorage.getItem('lastSearchMarti');
    if (savedQuery) {
      dispatch(setSearchQuery(savedQuery));
      dispatch(setCurrentPage(1));
      navigate('?page=1');
    }
  }, [dispatch, navigate]);

  return (
    <div className="app_wrapper">
      <ErrorBoundary fallback={<div>Sorry for the inconvenience. An error occurred, try loading the page again.</div>}>
        {(setError) => (
          <>
            <Header onSearch={handleSearch} initialQuery={query} onError={setError} />
            <Content />
          </>
        )}
      </ErrorBoundary>
    </div>
  );
}
