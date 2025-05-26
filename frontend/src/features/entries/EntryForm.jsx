import React from "react";
import { createEntry } from "../../services/supabaseClient";

function EntryForm({ handleCancelEntry, onCreateEntry }) {
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

  return (
    <form className="flex flex-col gap-3 h-full" onSubmit={handleCreateEntry}>
      <input name="title" type="text" placeholder="Title" required />
      <textarea
        name="content"
        type="text"
        placeholder="What happened here?"
        className="flex-1"
      />
      <div className="flex flex-row justify-end gap-2">
        <button
          type="button"
          className="bg-red-500 text-white rounded-4xl px-4 py-2"
          onClick={handleCancelEntry}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-4xl px-4 py-2"
        >
          Create Entry
        </button>
      </div>
    </form>
  );
}

export default EntryForm;
