import React, { useState, useEffect } from "react";
import { createEntry, getEntryById, editEntry } from "../../services/supabaseClient";
import { useParams } from "react-router";

function EntryForm({ mode, onCancelEntry, onCreateEntry, onEditEntry }) {
  const [entry, setEntry] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (mode === "edit") {
      getEntryById(id).then((data) => setEntry(data));
    }
  }, []);

  async function handleCreateEntry(e) {
    e.preventDefault();

    const form = e.target;
    const entry = {
      title: form.title.value,
      content: form.content.value,
    };

    const result = await createEntry(entry);

    if (!result || result.error) {
      console.error("Entry creation error:", result?.error);
      return;
    }

    onCreateEntry();
  }

  async function handleEditEntry(e) {
    e.preventDefault();

    const form = e.target;
    const entry = {
      id,
      title: form.title.value,
      content: form.content.value,
    };

    const result = await editEntry(entry);

    if (!result || result.error) {
      console.error("Entry edit error:", result?.error);
      return;
    }

    onEditEntry();
  }

  return (
    <form
      className="flex flex-col gap-3 h-full"
      onSubmit={mode === "create" ? handleCreateEntry : handleEditEntry}
    >
      <input
        name="title"
        type="text"
        placeholder="Title"
        defaultValue={entry ? entry.title : ""}
        required
      />
      <textarea
        name="content"
        type="text"
        placeholder="What happened here?"
        className="flex-1"
        defaultValue={entry ? entry.content : ""}
      />
      <div className="flex flex-row justify-end gap-2">
        <button
          type="button"
          className="bg-red-500 text-white rounded-4xl px-4 py-2"
          onClick={onCancelEntry}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-4xl px-4 py-2"
        >
          {mode === "create" ? "Create Entry" : "Edit Entry"}
        </button>
      </div>
    </form>
  );
}

export default EntryForm;
