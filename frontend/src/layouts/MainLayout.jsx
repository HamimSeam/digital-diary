import React from "react";
import { Outlet } from "react-router";
import TopBar from "../components/TopBar";

function MainLayout() {
  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
