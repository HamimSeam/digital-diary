import React from "react";
import { Link } from "react-router";

function TopBar() {
  return (
    <header className="top-bar p-6">
      <nav className="flex items-center h-6 space-x-4">
        <Link className="link">Map</Link>
        <hr className="w-px h-full bg-gray-500 border-0" />
        <Link className="link">Entries</Link>
      </nav>
    </header>
  );
}

export default TopBar;
