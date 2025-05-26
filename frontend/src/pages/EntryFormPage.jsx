import React from "react";
import EntryForm from "../features/map/EntryForm";
import { useNavigate } from "react-router";

function EntryFormPage() {
  const navigate = useNavigate();

  async function handleCreateEntry() {
    navigate("/entries");
  }

  return (
    <div className="bg-rose-50 flex justify-center w-screen h-full p-10">
      <main className="bg-white border-2 rounded-4xl border-gray-500 w-5/6 p-6">
        <EntryForm onCreateEntry={handleCreateEntry} />
      </main>
    </div>
  );
}

export default EntryFormPage;
