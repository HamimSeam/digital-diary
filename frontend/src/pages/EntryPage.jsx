import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getEntryById, deleteEntry } from "../services/supabaseClient";

function EntryPage() {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getEntryById(id).then((data) => setEntry(data));
  }, []);

async function handleDeleteEntry() {
  const result = await deleteEntry(id);

  if (!result) {
    console.error("Entry delete error");
    return;
  }

  navigate("/entries");
}

  return (
    <div className="flex justify-center bg-rose-50 w-screen min-h-full p-6">
      {entry && (
        <main className="flex flex-col w-3/5 gap-3 min-h-5/6 p-6 border-2 bg-white rounded-3xl">
          <div className="ml-auto">
            <p>05/25/2025</p>
          </div>
          <h3>{entry.title}</h3>
          <p className="flex-1">{entry.content}</p>
          <div className="flex gap-3 ml-auto">
            <button
              className="bg-amber-800 text-white"
              onClick={() => navigate(`/entries/${id}/edit`)}
            >
              Edit
            </button>
            <button
              className="bg-amber-800 text-white"
              onClick={handleDeleteEntry}
            >
              Delete
            </button>
          </div>
        </main>
      )}
    </div>
  );
}

export default EntryPage;
