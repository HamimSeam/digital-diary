import React from "react";
import { Outlet } from "react-router";
import TopBar from "../components/TopBar";

function MainLayout() {
  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <div className="flex justify-center flex-1 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
