import { useState, useEffect, useMemo, useCallback } from 'react';
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
  searchQuery: string;
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

export default function AstronomicalObjects({ searchKey, searchQuery }: AstronomicalObjectsProps) {
  const [data, setData] = useState<AstronomicalObject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const location = useLocation();

  const getPageNumber = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    return parseInt(searchParams.get('page') || '1', 10);
  }, [location.search]);

  const currentPage = useMemo(() => getPageNumber(), [getPageNumber]);

  useEffect(() => {
    const fetchData = async (searchQueryUse: string, page: number) => {
      try {
        const response = await fetch(`http://stapi.co/api/v2/rest/astronomicalObject/search?pageNumber=${page - 1}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `name=${searchQueryUse}`
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json() as AstronomicalObjectResponse;
        setData(result.astronomicalObjects);
        setTotalPages(result.page.totalPages);
        setLoading(false);
      } catch (fetchError) {
        setError((fetchError as Error).message);
        setLoading(false);
      }
    };

    const asyncFetchData = async () => {
      setLoading(true);
      await fetchData(searchQuery, currentPage);
    };

    asyncFetchData().catch((err: unknown) => {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setLoading(false);
    });

  }, [searchKey, searchQuery, currentPage]);

  if (loading) {
    return <div>Loading Astronomical Objects...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
