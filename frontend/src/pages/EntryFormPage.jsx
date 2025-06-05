import React from "react";
import EntryForm from "../features/entries/EntryForm";
import { useNavigate } from "react-router";

function EntryFormPage({ mode }) {
  const navigate = useNavigate();

  function handleCreateEntry() {
    navigate("/entries");
  }

  function handleEditEntry() {
    navigate("/entries");
  }

  function handleCancelEntry() {
    navigate("/entries");
  }

  return (
    <div className="flex justify-center w-screen h-full p-10">
      <main className="bg-white border border-gray-200 rounded-3xl shadow-sm w-full max-w-4xl p-8">
        <EntryForm
          onCreateEntry={handleCreateEntry}
          onEditEntry={handleEditEntry}
          onCancelEntry={handleCancelEntry}
          mode={mode}
        />
      </main>
    </div>
  );
}

export default EntryFormPage;
