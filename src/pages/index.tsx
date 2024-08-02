

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/header';
import Content from '../components/content';
import ErrorBoundary from '../components/errorBoundary';
import { RootState } from '../store';
import { setCurrentPage } from '../slice/paginationSlice';
import { setSearchQuery } from '../slice/searchSlice';
import { setAstronomicalObjects } from '../slice/astronomicalObjectsSlice';
import { AstronomicalObject } from '../services/astronomicalObjectsApi';


interface HomeProps {
  initialData: AstronomicalObject[];
  query: string;
}

interface ApiResponse {
  astronomicalObjects: AstronomicalObject[];
}

export default function Home({ initialData, query }: HomeProps) {
  const dispatch = useDispatch();
  const storedQuery = useSelector((state: RootState) => state.search.query);

  const handleSearch = (newQuery: string) => {
    dispatch(setSearchQuery(newQuery));
    localStorage.setItem('lastSearchMarti', newQuery);
    dispatch(setCurrentPage(1));
  };

  useEffect(() => {
    dispatch(setAstronomicalObjects(initialData));
    dispatch(setSearchQuery(query));
  }, [initialData, query, dispatch]);

  useEffect(() => {
    const savedQuery = localStorage.getItem('lastSearchMarti');
    if (savedQuery) {
      dispatch(setSearchQuery(savedQuery));
      dispatch(setCurrentPage(1));
    }
  }, [dispatch]);

  return (
    <ErrorBoundary fallback={<div>Sorry for the inconvenience. An error occurred, try loading the page again.</div>}>
      {(setError) => (
        <div>
          <div>
            <Header onSearch={handleSearch} initialQuery={storedQuery} onError={setError} />
            <Content />
          </div>
        </div>
      )}
    </ErrorBoundary>
  );
}

export async function getServerSideProps() {
  console.log("Fetching data on the server...");

  try {
    const searchQuery = '';

    const response = await fetch('http://stapi.co/api/v2/rest/astronomicalObject/search?pageNumber=0', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `name=${searchQuery}`,
    });

    console.log("Response received:", response.status);

    const data = await response.json() as ApiResponse ;

    if (!response.ok) {
      console.log("Response not OK");
      return { props: { initialData: [], query: searchQuery } };
    }

    console.log("Returning data...", data.astronomicalObjects);
    return { props: { initialData: data.astronomicalObjects, query: searchQuery } };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return { props: { initialData: [], query: '' } };
  }
}