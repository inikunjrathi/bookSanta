import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./components/homeScreen";
import { Auth } from "./components/authScreen";
import ProtectedRoute from "./components/protectedRoute";
import { Submit } from "./components/submitScreen";
import { SubmittedBooks } from "./components/submittedBooks";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/submit"
          element={
            <ProtectedRoute>
              <Submit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/submittedbooks"
          element={
            <ProtectedRoute>
              <SubmittedBooks />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
