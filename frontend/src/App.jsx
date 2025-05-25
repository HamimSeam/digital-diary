import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";
import "./App.css";
import MapPage from "./pages/MapPage";
import { addDiaryEntry } from "./services/supabaseClient";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MapPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
