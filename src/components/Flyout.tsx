import React from 'react';
import { AstronomicalObject } from '../services/astronomicalObjectsApi';

interface FlyoutProps {
  selectedObjects: AstronomicalObject[];
  onUnselectAll: () => void;
}

export default function Flyout({ selectedObjects, onUnselectAll }: FlyoutProps) {

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
      <h2>Selected Objects</h2>
      <ul>
        {selectedObjects.map((obj) => (
          <li key={obj.uid}>{obj.name}</li>
        ))}
      </ul>
      <button type="button" onClick={onUnselectAll}>Unselect All</button>
      <button type="button" onClick={handleDownload}>Download CSV</button>
    </div>
  );
}
