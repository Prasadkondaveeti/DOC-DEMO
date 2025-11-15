// src/components/AutoLogout.js
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const AutoLogout = ({ children }) => {
  const timerRef = useRef(null);
  const timeout = 120000; // 2 minutes
  const location = useLocation();

  // Stop auto-logout on login page
  const isLoginPage = location.pathname === "/";

  const logoutUser = () => {
    localStorage.clear();
    document.cookie = "session_start=; Max-Age=0; path=/;";
    window.location.href = "/"; // go to login
  };

  const resetTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const now = Date.now();
    localStorage.setItem("sessionExpiry", now + timeout);

    timerRef.current = setTimeout(logoutUser, timeout);
  };

  const checkSessionExpiry = () => {
    const expiry = localStorage.getItem("sessionExpiry");
    if (expiry && Date.now() >= Number(expiry)) logoutUser();
  };

  useEffect(() => {
    // Stop all timers on Login page
    if (isLoginPage) return;

    resetTimers();

    window.addEventListener("mousemove", resetTimers);
    window.addEventListener("keydown", resetTimers);
    window.addEventListener("click", resetTimers);
    window.addEventListener("scroll", resetTimers);

    const interval = setInterval(checkSessionExpiry, 1000);

    return () => {
      clearTimeout(timerRef.current);
      clearInterval(interval);
    };
  }, [isLoginPage]);

  return children;
};

export default AutoLogout;
