import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AstronomicalObject } from './astronomicalObjectsApi';
import Pagination from '../components/Pagination';
import Flyout from '../components/Flyout';
import Details from '../pages/details/[id]';

interface AstronomicalObjectsProps {
  searchQuery: string;
  currentPage: number;
  initialData: AstronomicalObject[];
  totalPages: number;
  selectedId?: string | null;
  detailsData?: { astronomicalObject: AstronomicalObject } | null;
}

export default function AstronomicalObjects({
  searchQuery,
  currentPage,
  initialData,
  totalPages,
  selectedId: initialSelectedId = null,
  detailsData: initialDetailsData = null,
}: AstronomicalObjectsProps) {
  const router = useRouter();
  const [selectedObjects, setSelectedObjects] = useState<AstronomicalObject[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(initialSelectedId);
  const [detailsData, setDetailsData] = useState<{ astronomicalObject: AstronomicalObject } | null>(initialDetailsData);

  useEffect(() => {
    if (initialSelectedId && initialDetailsData) {
      setSelectedId(initialSelectedId);
      setDetailsData(initialDetailsData);
    }
  }, [initialSelectedId, initialDetailsData]);

  const isSelected = (obj: AstronomicalObject) =>
    selectedObjects.some((item: AstronomicalObject) => item.uid === obj.uid);

  const handleCheckboxChange = (obj: AstronomicalObject) => {
    if (isSelected(obj)) {
      setSelectedObjects(selectedObjects.filter(item => item.uid !== obj.uid));
    } else {
      setSelectedObjects([...selectedObjects, obj]);
    }
  };

  const handleCardClick = async (id: string) => {
    try {
      await router.push(`/?searchQuery=${searchQuery}&page=${currentPage}&id=${id}`);
    } catch (error) {
      console.error("Failed to navigate:", error);
    }
  };
  
  const handleClick = (id: string) => {
    handleCardClick(id).catch(error => {
      console.error("Failed to click card:", error);
    });
  };

  const handleCloseDetails = async () => {
    setSelectedId(null);
    setDetailsData(null);
    await router.push(`/?searchQuery=${searchQuery}&page=${currentPage}`);
  };
  
  const handleCloseDetailsWrapper = () => {
    handleCloseDetails().catch(error => {
      console.error("Failed to close details:", error);
    });
  };

  const handleUnselectAll = () => {
    setSelectedObjects([]);
  };

  return (
    <div className="content-wrapper">
      <div className="astronomical-objects-container" >
        {selectedObjects.length > 0 && (
          <Flyout selectedObjects={selectedObjects} onUnselectAll={handleUnselectAll} />
        )}
        <div className="astronomical-objects-list">
          {initialData && initialData.length === 0 ? (
            <p>No results found</p>
          ) : (
            initialData?.map((obj: AstronomicalObject) => (
              <div
                key={obj.uid}
                className="astronomical-object"
                role="button"
                tabIndex={0}
                onClick={() => handleClick(obj.uid)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleClick(obj.uid);
                    }
                  }}
              >
                <h2>{obj.name}</h2>
                <p>Type: {obj.astronomicalObjectType}</p>
                <p>Location: {obj.location ? obj.location.name : 'Unknown'}</p>
                <input
                  type="checkbox"
                  checked={!!isSelected(obj)}
                  onChange={() => handleCheckboxChange(obj)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            ))
          )}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
      <div className="details-container">
        {selectedId && detailsData && (
          <Details data={detailsData} onClose={handleCloseDetailsWrapper} />
        )}
      </div>
    </div>
  );
}
