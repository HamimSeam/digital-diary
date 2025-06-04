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
    <div className="bg-rose-50 flex justify-center w-screen h-full p-10">
      <main className="bg-white border-2 rounded-4xl border-gray-500 w-5/6 p-6">
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
