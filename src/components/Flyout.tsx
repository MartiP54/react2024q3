import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { clearSelectedObjects } from '../slice/selectedObjectsSlice';
import { AstronomicalObject } from '../services/astronomicalObjectsApi';

export default function Flyout() {
  const dispatch = useDispatch();
  const selectedObjects = useSelector((state: RootState) => state.selectedObjects.selectedObjects);

  const handleUnselectAll = () => {
    dispatch(clearSelectedObjects());
  };

  const handleDownload = () => {
    if (selectedObjects.length > 0) {
      const csvContent = [
        ["Name", "Type", "Location"].join(","),
        ...selectedObjects.map((obj: AstronomicalObject) =>
          [
            obj.name,
            obj.astronomicalObjectType,
            obj.location?.name || "Unknown"
          ].join(",")
        )
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedObjects.length}_astronomical_objects.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flyout">
      <p>{selectedObjects.length} items are selected</p>
      <button type="button" onClick={handleUnselectAll}>Unselect all</button>
      <button type="button" onClick={handleDownload}>Download</button>
    </div>
  );
}
