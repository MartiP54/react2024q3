import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { clearSelectedObjects } from '../slice/selectedObjectsSlice';
import { AstronomicalObject } from '../services/astronomicalObjectsApi';

export default function Flyout() {
  const dispatch = useDispatch();
  const selectedObjects = useSelector((state: RootState) => state.selectedObjects.selectedObjects);
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

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

      if (downloadLinkRef.current) {
        downloadLinkRef.current.href = url;
        downloadLinkRef.current.download = `${selectedObjects.length}_astronomical_objects.csv`;
        downloadLinkRef.current.click();
        URL.revokeObjectURL(url);
      }
    }
  };

  return (
    <div className="flyout">
      <p className="flyout-description">{selectedObjects.length} items are selected</p>
      <button type="button" onClick={handleUnselectAll}>Unselect all</button>
      <button type="button" onClick={handleDownload}>Download</button>
      <a ref={downloadLinkRef} href="/" style={{ display: 'none' }}>Download</a>
    </div>
  );
}
