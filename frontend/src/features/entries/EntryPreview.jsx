import React from "react";
import { formatDate } from "../../utils/dates";

function EntryPreview({ entry, onClick }) {
  return (
    <div className="flex flex-col gap-2 bg-white rounded-xl shadow-lg p-4 h-36" onClick={onClick}>
      <div className="ml-auto text-gray-500 text-md">
        <p>{formatDate(entry.created_at)} • New York, NY</p>
      </div>
      <div className="text-2xl font-semibold mb-2">{entry.title}</div>
      <p>
        {entry.content.length > 100
          ? entry.content.slice(0, 100) + "..."
          : entry.content}
      </p>
    </div>
  );
}

export default EntryPreview;
