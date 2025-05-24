import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";
import "./App.css";
import MapPage from "./pages/MapPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MapPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
