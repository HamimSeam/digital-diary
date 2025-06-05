import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { getEntries } from "../services/supabaseClient";
import EntryPreview from "../features/entries/EntryPreview";
import {
  startDateToUtc,
  endDateToUtc,
  startDateToLocal,
  endDateToLocal,
} from "../utils/dates";

function EntriesPage() {
  const [entries, setEntries] = useState(null);
  const [queryOptions, setQueryOptions] = useState({
    sortBy: "created_at",
    ascending: false,
    startDate: "",
    endDate: "",
    searchTerm: "",
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

  function handleQueryOptions(e) {
    let { name: key, value } = e.target;

    if (!value) {
      setQueryOptions((prev) => {
        const { [key]: _, ...rest } = prev;
        return rest;
      });
      return;
    }

    if (key === "startDate") value = startDateToUtc(value);
    if (key === "endDate") value = endDateToUtc(value);

    setQueryOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function resetFilters(e) {
    setQueryOptions((prev) => ({
      ...prev,
      startDate: "",
      endDate: "",
    }));

    console.log("Filters reset");
  }

  return (
    <div className="flex h-full w-11/12 justify-center p-5 gap-6">
      {/* Sidebar Filters */}
      <form className="flex flex-col gap-4 bg-white border border-gray-200 w-1/4 min-w-[220px] max-w-[300px] p-4 rounded-xl text-gray-700 shadow-sm">
        <div className="font-semibold text-2xl">Filters</div>

        <div className="flex flex-col gap-2 bg-white border border-gray-300 rounded-xl p-4 shadow-sm">
          <div className="text-md font-semibold text-emerald-600">
            Date Range
          </div>

          <label className="text-sm text-gray-600">Start date</label>
          <input
            type="date"
            name="startDate"
            value={
              queryOptions.startDate
                ? startDateToLocal(queryOptions.startDate)
                : ""
            }
            onChange={handleQueryOptions}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          />

          <label className="text-sm text-gray-600">End date</label>
          <input
            type="date"
            name="endDate"
            value={
              queryOptions.endDate ? endDateToLocal(queryOptions.endDate) : ""
            }
            onChange={handleQueryOptions}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={resetFilters}
            className="bg-amber-900 text-white text-sm px-3 py-1 rounded-md hover:bg-amber-800 transition"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Main Content */}
      <div className="flex flex-col gap-5 w-full">
        {/* Search Bar */}
        <div className="flex bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm">
          <input
            type="search"
            name="searchTerm"
            value={queryOptions.searchTerm || ""}
            className="flex-1 border-none outline-none text-sm placeholder:text-gray-400"
            onChange={handleQueryOptions}
            placeholder="Search for an entry..."
          />
        </div>

        {/* Sort & New Entry */}
        <div className="flex justify-end items-center gap-3">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            onChange={handleSort}
            className="text-sm border border-gray-300 rounded-md px-2 py-1"
          >
            <option value="created_at:desc">Newest</option>
            <option value="created_at:asc">Oldest</option>
          </select>
          <Link
            to="/entries/create"
            className="bg-amber-900 text-white text-sm px-4 py-2 rounded-md hover:bg-amber-800 transition"
          >
            + New Entry
          </Link>
        </div>

        {/* Entries List */}
        <div className="flex flex-col divide-y divide-gray-300 bg-white rounded-xl shadow-sm">
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
