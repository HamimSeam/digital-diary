import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";
import "./App.css";
import MapPage from "./pages/MapPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import EntriesPage from "./pages/EntriesPage";
import EntryFormPage from "./pages/EntryFormPage";
import EntryPage from "./pages/EntryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<MapPage />} />
          <Route path="entries" element={<EntriesPage />} />
          <Route
            path="entries/create"
            element={<EntryFormPage mode="create" />}
          />
          <Route path="entries/:id" element={<EntryPage />} />
          <Route
            path="entries/:id/edit"
            element={<EntryFormPage mode="edit" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
