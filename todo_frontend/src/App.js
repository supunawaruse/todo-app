import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login/index";
import Register from "./pages/Register/index";
import Dashboard from "./pages/Dashboard/index";
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token); // Check if token exists in session storage
  }, []);

  const handleLoginSuccess = (token) => {
    console.log("aaa");
    setIsLoggedIn(true);
    sessionStorage.setItem("token", token);
  };

  return (
    <Router>
      <Routes>
        {!isLoggedIn && (
          <>
            <Route
              path="/"
              element={<Login onLoginSuccess={handleLoginSuccess} />}
            />
            <Route path="/register" element={<Register />} />
          </>
        )}
        {isLoggedIn && <Route path="/dashboard" element={<Dashboard />} />}
        {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
