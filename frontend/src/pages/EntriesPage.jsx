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
    <div className="flex h-full">
      {/*Side bar options*/}
      <form className="flex flex-col gap-3 bg-stone-100 border-r-gray-400 border-r-2 w-1/5 p-4">
        {/*Dates*/}
        <fieldset className="flex flex-col gap-2 border-1 rounded-2xl p-3">
          <legend className="ml-2">Date Range</legend>
          <label>Start date:</label>
          <input
            type="date"
            value={
              queryOptions.startDate
                ? startDateToLocal(queryOptions.startDate)
                : ""
            }
            name="startDate"
            onChange={handleQueryOptions}
          />
          <label>End date:</label>
          <input
            type="date"
            value={
              queryOptions.endDate ? endDateToLocal(queryOptions.endDate) : ""
            }
            name="endDate"
            onChange={handleQueryOptions}
          />
        </fieldset>
        <div className="flex gap-2 ml-auto">
          <button
            type="button"
            onClick={resetFilters}
            className="bg-amber-900 text-white"
          >
            Reset Filters
          </button>
        </div>
      </form>
      <div className="flex flex-col gap-2 w-full bg-rose-50 p-4">
        <div className="flex bg-gray-50 border-1 border-gray-500 text-gray-500 rounded-full px-3">
          {/*Search bar*/}
          <input
            type="search"
            name="searchTerm"
            value={queryOptions.searchTerm || ""}
            className="flex-1 border-0"
            onChange={handleQueryOptions}
          />
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
