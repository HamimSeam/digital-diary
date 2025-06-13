import React from "react";
import { useNavigate } from "react-router";
import { formatDate } from "../../utils/dates";

function Entry({ entry, onEdit, onDelete }) {
  return (
        <main className="flex flex-col w-6xl gap-4 min-h-[80vh] p-6 border border-gray-200 bg-white rounded-3xl shadow-sm">
          <div className="ml-auto text-gray-500 text-sm">
            <p>{formatDate(entry.created_at)}</p>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800">
            {entry.title}
          </h3>
          <p className="flex-1 text-gray-700 whitespace-pre-wrap">
            {entry.content}
          </p>
          <div className="flex gap-3 ml-auto">
            <button
              className="bg-amber-800 hover:bg-amber-900 text-white px-4 py-2 rounded-md transition"
              onClick={onEdit}
            >
              Edit
            </button>
            <button
              className="bg-amber-800 hover:bg-amber-900 text-white px-4 py-2 rounded-md transition"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </main>
  );
}

export default Entry;
