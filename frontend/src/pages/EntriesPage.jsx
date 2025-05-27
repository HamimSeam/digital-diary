import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { getEntries } from "../services/supabaseClient";
import EntryPreview from "../features/entries/EntryPreview";
import { convertLocalToUtc } from "../utils/dates";

function EntriesPage() {
  const [entries, setEntries] = useState(null);
  const [queryOptions, setQueryOptions] = useState({
    sortBy: "created_at",
    ascending: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    getEntries(queryOptions).then((data) => setEntries(data));
  }, [queryOptions]);

  function handleSort(e) {
    const [column, direction] = e.target.value.split(":");
    setQueryOptions((prev) => ({
      ...prev,
      sortBy: column,
      ascending: direction === "asc",
    }));
  }

  function handleFilters(e) {
    e.preventDefault();

    const startInput = e.target.startDate.value;
    const endInput = e.target.endDate.value;

    const startDate = startInput
      ? convertLocalToUtc(`${startInput}T00:00:00`)
      : null;

    const endDate = endInput
      ? convertLocalToUtc(`${endInput}T23:59:59.999`)
      : null;

    setQueryOptions((prev) => ({
      ...prev,
      startDate,
      endDate,
    }));

    console.log("Filters applied:", { startDate, endDate });
  }

  function resetFilters(e) {
    e.preventDefault();

    e.target.form.startDate.value = "";
    e.target.form.endDate.value = "";

    setQueryOptions((prev) => ({
      ...prev,
      startDate: null,
      endDate: null,
    }));

    console.log("Filters reset");
  }

  return (
    <div className="flex h-full">
      <form
        className="flex flex-col gap-3 bg-stone-100 border-r-gray-400 border-r-2 w-1/5 h-full p-4"
        onSubmit={handleFilters}
      >
        <fieldset className="flex flex-col gap-2 border-1 rounded-2xl p-3">
          <legend className="ml-2">Date Range</legend>
          <label>Start date:</label>
          <input type="date" name="startDate" />
          <label>End date:</label>
          <input type="date" name="endDate" />
        </fieldset>
        <div className="flex gap-2 ml-auto">
          <button
            type="button"
            onClick={resetFilters}
            className="bg-amber-900 text-white"
          >
            Reset Filters
          </button>
          <button type="submit" className="bg-amber-900 text-white">
            Apply Filters
          </button>
        </div>
      </form>
      <div className="flex flex-col gap-2 w-full bg-rose-50 p-4">
        <div className="flex bg-gray-50 border-1 border-gray-500 text-gray-500 rounded-full px-3">
          <input type="search" className="flex-1 border-0" />
          <button className="bg-">🔍</button>
        </div>
        <div className="flex justify-end items-center gap-2">
          <span>Sort by: </span>
          <select onChange={handleSort}>
            <option value="created_at:desc">Newest</option>
            <option value="created_at:asc">Oldest</option>
          </select>
          <Link
            to="/entries/create"
            className="link-btn bg-amber-900 text-white"
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
