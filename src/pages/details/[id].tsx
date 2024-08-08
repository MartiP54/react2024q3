import { AstronomicalObject } from '../../services/astronomicalObjectsApi';

interface DetailsProps {
  data: { astronomicalObject: AstronomicalObject } | null;
  onClose: () => void;
}

export default function Details({ data, onClose }: DetailsProps) {
  if (!data || !data.astronomicalObject) {
    return <div>Loading...</div>;
  }

  const {
    name,
    astronomicalObjectType,
    location,
    astronomicalObjects,
  } = data.astronomicalObject;

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
            <button type="button" onClick={onClose} className="close-button">Close</button>
    </div>
  );
}
