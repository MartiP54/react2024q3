import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Pagination from '../components/Pagination';

interface Location {
  uid: string;
  name: string;
}

interface AstronomicalObject {
  uid: string;
  name: string;
  astronomicalObjectType: string;
  location: Location | null;
}

interface AstronomicalObjectsProps {
  searchKey: number;
}

interface AstronomicalObjectResponse {
  astronomicalObjects: AstronomicalObject[];
  page: {
    totalElements: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
  };
}

export default function AstronomicalObjects({ searchKey }: AstronomicalObjectsProps) {
  const [data, setData] = useState<AstronomicalObject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const savedQueryRef = useRef<string>('');
  const location = useLocation();

  const getPageNumber = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    return parseInt(searchParams.get('page') || '1', 10);
  }, [location.search]);

  const currentPage = useMemo(() => getPageNumber(), [getPageNumber]);

  useEffect(() => {
    const fetchData = async (searchQuery: string, page: number) => {
      try {
        savedQueryRef.current = searchQuery;
        const response = await fetch('http://stapi.co/api/v2/rest/astronomicalObject/search', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `name=${searchQuery}&pageNumber=${page - 1}`
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json() as AstronomicalObjectResponse;
        setData(result.astronomicalObjects);
        setLoading(false);
      } catch (fetchError) {
        setError((fetchError as Error).message);
        setLoading(false);
      }
    };

    const savedQuery = localStorage.getItem('lastSearchMarti') || '';

    const asyncFetchData = async () => {
      await fetchData(savedQuery, currentPage);
    };

    asyncFetchData().catch((err: unknown) => {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setLoading(false);
    });

  }, [searchKey, location.search, currentPage, getPageNumber]);

  if (loading) {
    return <div>Loading Astronomical Objects...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  const totalPages = 49;

  return (
    <div>
      <h1>Astronomical Objects</h1>
      <div className="astronomical-objects-list">
        {data.length === 0 ? (
          <p>No results found</p>
        ) : (
          data.map((obj) => (
            <div key={obj.uid} className="astronomical-object">
              <h2>{obj.name}</h2>
              <p>Type: {obj.astronomicalObjectType}</p>
              <p>Location: {obj.location ? obj.location.name : 'Unknown'}</p>
            </div>
          ))
        )}
      </div>
      <Pagination currentPage={getPageNumber()} totalPages={totalPages} />
    </div>
  );
};