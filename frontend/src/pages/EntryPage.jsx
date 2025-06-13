import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getEntryById, deleteEntry } from "../services/supabaseClient";
import { formatDate } from "../utils/dates";
import Entry from "../features/entries/Entry";

function EntryPage() {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getEntryById(id).then((data) => setEntry(data));
  }, []);

  async function handleEditEntry() {
    navigate("/entries/:id/edit");
  }

  async function handleDeleteEntry() {
    const result = await deleteEntry(id);

    if (!result) {
      console.error("Entry delete error");
      return;
    }

    navigate("/entries");
  }

  return (
    <div className="flex justify-center w-full p-6">
      {entry && (
        <Entry
          entry={entry}
          onEdit={handleEditEntry}
          onDelete={handleDeleteEntry}
        />
      )}
    </div>
  );
}

export default EntryPage;
