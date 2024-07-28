import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import astronomicalObjectsApi from '../services/astronomicalObjectsApi';
import { setSelectedObject, clearSelectedObject } from '../slice/selectedObjectSlice';

const { useFetchAstronomicalObjectDetailsQuery } = astronomicalObjectsApi;

export default function AstronomicalObjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, error, isFetching } = useFetchAstronomicalObjectDetailsQuery(id!);
  const selectedObject = useSelector((state: RootState) => state.selectedObject.selectedObject);

  useEffect(() => {
    if (data && data.astronomicalObject) {
      dispatch(setSelectedObject(data.astronomicalObject));
    }
  }, [data, dispatch]);

  const handleClose = () => {
    dispatch(clearSelectedObject());
    navigate('/');
  };

  if (isFetching) {
    return <div>Loading details...</div>;
  }

  if (error) {
    return <div>Error loading details: {JSON.stringify(error)}</div>;
  }

  if (!selectedObject) {
    return null;
  }

  const { name, astronomicalObjectType, location, astronomicalObjects } = selectedObject;

  return (
    <div className="astronomical-object-details">
      <h2>{name}</h2>
      <p>Type: {astronomicalObjectType}</p>
      <p>Location: {location ? location.name : 'Unknown'}</p>
      {location?.astronomicalObjectType && <p>Location Type: {location.astronomicalObjectType}</p>}
      {location?.location && <p>Parent Location: {location.location.name}</p>}
      {astronomicalObjects && astronomicalObjects.length > 0 && (
        <div>
          <h3>Sub-objects:</h3>
          <ul>
            {astronomicalObjects.map((obj) => (
              <li key={obj.uid}>{obj.name}</li>
            ))}
          </ul>
        </div>
      )}
            <button className='details-button' type="button" onClick={handleClose}>Close</button>
    </div>
  );
}
