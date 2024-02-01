"use client";
import { useEffect, useCallback } from "react";
import { signOut } from "next-auth/react";
const useLogout = () => {
  const logout = useCallback(async () => {
    const logoutApiUrl = "http://localhost:5000/v1/logout";

    try {
      const response = await fetch(logoutApiUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        signOut();
        document.cookie = "next-auth.csrf-token";
        document.cookie = "next-auth.session-token";
      } else {
        // Handle API logout failure
        console.error("API logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, []);
  return logout;
};

export default useLogout;
