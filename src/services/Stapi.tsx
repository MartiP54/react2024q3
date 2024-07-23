
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../store';
import astronomicalObjectsApi from "./astronomicalObjectsApi";
import { setCurrentPage } from '../slice/paginationSlice';
import { setAstronomicalObjects } from '../slice/astronomicalObjectsSlice';
import Pagination from '../components/Pagination';

interface AstronomicalObjectsProps {
  searchQuery: string;
  currentPage: number;
}

export default function AstronomicalObjects({ searchQuery, currentPage }: AstronomicalObjectsProps) {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('page') || '1', 10);
    dispatch(setCurrentPage(page));
  }, [location.search, dispatch]);

  const { data, error, isFetching } = astronomicalObjectsApi.useFetchAstronomicalObjectsQuery({ searchQuery, page: currentPage });

  useEffect(() => {
    if (data) {
      dispatch(setAstronomicalObjects(data.astronomicalObjects));
    }
  }, [data, dispatch]);

  const storedData = useSelector((state: RootState) => state.astronomicalObjects.data);

  if (isFetching) {
    return <div>Loading Astronomical Objects...</div>;
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <div>
      <h1>Astronomical Objects</h1>
      <div className="astronomical-objects-list">
        {storedData && storedData.length === 0 ? (
          <p>No results found</p>
        ) : (
          storedData?.map((obj) => (
            <div key={obj.uid} className="astronomical-object">
              <h2>{obj.name}</h2>
              <p>Type: {obj.astronomicalObjectType}</p>
              <p>Location: {obj.location ? obj.location.name : 'Unknown'}</p>
            </div>
          ))
        )}
      </div>
      <Pagination currentPage={currentPage} totalPages={data?.page.totalPages || 0} />
    </div>
  );
}
