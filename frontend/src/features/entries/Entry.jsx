import React from "react";

function Entry({ entry }) {
  return (
    <div className="flex flex-col w-full p-6 mt-6 border-amber-400 border-2 rounded-3xl">
      <div className="ml-auto">
        <p>05/25/2025</p>
      </div>
      <h3>{entry.title}</h3>
      <p>{entry.content}</p>
      <div className="flex gap-3 ml-auto">
        <button className="bg-amber-800 text-white">Edit</button>
        <button className="bg-amber-800 text-white">Delete</button>
      </div>
    </div>
  );
}

export default Entry;
