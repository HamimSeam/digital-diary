import React from "react";

function EntryPreview({ entry, onClick }) {
  return (
    <div className="bg-white rounded-3xl border-2 p-4 h-35" onClick={onClick}>
      <h3>{entry.title}</h3>
      <p>
        {entry.content.length > 300
          ? entry.content.slice(0, 300) + "..."
          : entry.content}
      </p>
    </div>
  );
}

export default EntryPreview;
