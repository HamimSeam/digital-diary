import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { getEntries } from "../services/supabaseClient";
import EntryPreview from "../features/entries/EntryPreview";

function EntriesPage() {
  const [entries, setEntries] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getEntries().then((data) => setEntries(data));
  }, []);

  return (
    <div className="flex h-full">
      <form className="flex flex-col gap-3 bg-stone-100 border-r-gray-400 border-r-2 w-1/5 h-full p-4">
        <fieldset className="flex flex-col gap-2 border-1 rounded-2xl p-3">
          <legend className="ml-2">Date Range</legend>
          <label>Start date:</label>
          <input type="date" />
          <label>End date:</label>
          <input type="date" />
        </fieldset>
        <div className="ml-auto">
          <button className="bg-amber-900 text-white">Apply Filters</button>
        </div>
      </form>
      <div className="flex flex-col gap-2 w-full bg-rose-50 p-4">
        <div className="flex bg-gray-50 border-1 border-gray-500 text-gray-500 rounded-full px-3">
          <input type="search" className="flex-1 border-0" />
          <button className="bg-">🔍</button>
        </div>
        <div className="flex">
          <Link
            to="/entries/create"
            className="ml-auto link-btn bg-amber-900 text-white"
          >
            + New Entry
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {entries &&
            entries.map((entry) => (
              <EntryPreview
                key={entry.id}
                entry={entry}
                onClick={() => navigate(`/entries/${entry.id}`)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default EntriesPage;
