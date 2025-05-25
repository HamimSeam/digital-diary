import React from "react";

function EntryForm({ handleCancelEntry }) {
  return (
    <form className="flex flex-col gap-3 h-full">
      <input type="text" placeholder="Title" />
      <textarea
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
          type="button"
          className="bg-blue-500 text-white rounded-4xl px-4 py-2"
        >
          Create Entry
        </button>
      </div>
    </form>
  );
}

export default EntryForm;
