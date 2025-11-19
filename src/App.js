import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Otp from './components/Otp';
import NeetSS from './components/NeetSS';
import NeetPg from './components/NeetPg';
import Dashboard from './components/Dashboard';
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from './components/Profile';
import AutoLogout from "./components/AutoLogout"; // ← ADDED

function App() {
  useEffect(() => {
    // Prevent going back to previous pages using browser back button
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
  }, []);

  return (
    <Router>

      {/* 🔥 AutoLogout wrapper added here */}
      <AutoLogout>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Login /></ProtectedRoute>} />
          <Route path="/otp" element={<ProtectedRoute><Otp /></ProtectedRoute>} />
          <Route path="/NeetSS" element={<ProtectedRoute><NeetSS /></ProtectedRoute>} />
          <Route path='/NeetPg' element={<ProtectedRoute><NeetPg /></ProtectedRoute>} />
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </AutoLogout>

    </Router>
  );
}

export default App;
