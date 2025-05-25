import React from "react";

function Toolbar({ mode, setMode }) {
  function toggleMode(newMode) {
    if (mode === "view") setMode(newMode);
    else setMode("view");
  }

  return (
    <div className="bg-white rounded-4xl p-2 flex gap-2 shadow-lg ">
      <button className="toolbar-btn" onClick={() => toggleMode("add")}>
        <img src="src/assets/pin.svg" alt="icon" className="w-10 h-10 p-1" />
      </button>
      <button className="toolbar-btn">
        <img src="src/assets/search.svg" alt="icon" className="w-10 h-10 p-1" />
      </button>
    </div>
  );
}

export default Toolbar;
