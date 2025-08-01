import React from "react";
import { Link, useNavigate } from "react-router";
import { useUser } from "../contexts/UserContext";

function TopBar() {
  const navigate = useNavigate();
  const { logout } = useUser();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <header className="top-bar h-1/12 border-b-gray-400 border-b-2">
      <nav className="flex items-center h-full">
        <Link className="link" to="/">Map</Link>
        <Link className="link" to="/entries">
          Entries
        </Link>
        <div className="ml-auto">
          <button className="link" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}

export default TopBar;
