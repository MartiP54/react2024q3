import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { RootState } from '../store';
import { setCurrentPage } from '../slice/paginationSlice';
import { setAstronomicalObjects } from '../slice/astronomicalObjectsSlice';
import { addSelectedObject, removeSelectedObject } from '../slice/selectedObjectsSlice';
import astronomicalObjectsApi, { AstronomicalObject } from './astronomicalObjectsApi';
import Pagination from '../components/Pagination';
import Flyout from '../components/Flyout';
import Details from '../pages/details/[id]'; 

interface AstronomicalObjectsProps {
  searchQuery: string;
  currentPage: number;
}

export default function AstronomicalObjects({ searchQuery, currentPage }: AstronomicalObjectsProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const { page } = router.query;
    const currentRouterPage = page ? parseInt(page as string, 10) : 1;
    dispatch(setCurrentPage(currentRouterPage));
  }, [router.query, dispatch]);

  const { data, error, isFetching } = astronomicalObjectsApi.useFetchAstronomicalObjectsQuery({ searchQuery: searchQuery || '', page: currentPage });

  useEffect(() => {
    if (data) {
      dispatch(setAstronomicalObjects(data.astronomicalObjects));
    }
  }, [data, dispatch]);

  const storedData = useSelector((state: RootState) => state.astronomicalObjects.data);
  const selectedObjects = useSelector((state: RootState) => state.selectedObjects.selectedObjects);

  useEffect(() => {
  }, [storedData]);

  const isSelected = (obj: AstronomicalObject) => selectedObjects.some((item: AstronomicalObject) => item.uid === obj.uid);

  const handleCheckboxChange = (obj: AstronomicalObject) => {
    if (isSelected(obj)) {
      dispatch(removeSelectedObject(obj.uid));
    } else {
      dispatch(addSelectedObject(obj));
    }
  };

  const handleItemClick = (id: string) => {
    setSelectedId(id);
  };

  const closeDetails = () => {
    setSelectedId(null);
  };

  if (isFetching) {
    return <div>Loading Astronomical Objects...</div>;
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="content-wrapper" style={{ display: 'flex', flexDirection: 'row' }}>
      <div className="astronomical-objects-container" style={{ flex: 1 }}>
        {selectedObjects.length > 0 && <Flyout />}
        <div className="astronomical-objects-list">
          {storedData && storedData.length === 0 ? (
            <p>No results found</p>
          ) : (
            storedData?.map((obj: AstronomicalObject) => (
              <div
                key={obj.uid}
                className="astronomical-object"
                onClick={() => handleItemClick(obj.uid)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleItemClick(obj.uid); }}
                role="button"
                tabIndex={0}
              >
                <h2>{obj.name}</h2>
                <p>Type: {obj.astronomicalObjectType}</p>
                <p>Location: {obj.location ? obj.location.name : 'Unknown'}</p>
                <input
                  type="checkbox"
                  checked={isSelected(obj)}
                  onChange={() => handleCheckboxChange(obj)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            ))
          )}
        </div>
        <Pagination currentPage={currentPage} totalPages={data?.page.totalPages || 0} />
      </div>
      {selectedId && (
        <div>
          <Details id={selectedId} />
          <button type='button' onClick={closeDetails}>Close</button>
        </div>
      )}
    </div>
  );
}

export function getServerSideProps(context: GetServerSidePropsContext): GetServerSidePropsResult<{ searchQuery: string; currentPage: number }> {
  const { query } = context;
  const searchQuery = Array.isArray(query.searchQuery) ? query.searchQuery.join(' ') : (query.searchQuery || '');
  const currentPage = parseInt(Array.isArray(query.page) ? query.page[0] : query.page as string, 10) || 1;
  return {
    props: {
      searchQuery,
      currentPage,
    },
  };
}
