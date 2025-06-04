import React, { useState, useRef } from "react";
import Map from "../features/map/Map";
import Toolbar from "../features/map/Toolbar";
import EntryForm from "../features/entries/EntryForm";

function MapPage() {
  const [mode, setMode] = useState("view");
  const markerRef = useRef(null);

  function handleAddMarker(marker) {
    if (markerRef.current) {
      markerRef.current.remove();
    }
    markerRef.current = marker;
    setMode("entry");
  }

  const handleCancelEntry = () => {
    if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }
    setMode("view");
  };

  return (
    <div className="relative w-full h-full">
      <Map
        mode={mode}
        setMode={setMode}
        handleAddMarker={handleAddMarker}
      />
      {mode === "add" && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white rounded-4xl p-3">
          Click on the map to place a pin. Or, click on the add pin button again
          to cancel.
        </div>
      )}
      {mode === "entry" && (
        <div className="absolute top-1/2 right-3 w-2/5 h-10/11 rounded-2xl p-3 bg-white shadow-lg overflow-auto z-20 transform -translate-y-1/2">
          <EntryForm onCancelEntry={handleCancelEntry} />
        </div>
      )}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <Toolbar mode={mode} setMode={setMode} />
      </div>
    </div>
  );
}

export default MapPage;
