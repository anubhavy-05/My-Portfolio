"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Mode = "recruiter" | "developer";

interface ModeContextType {
  mode: Mode;
  toggleMode: () => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: React.ReactNode }) {
  // Default mode recruiter rakhenge
  const [mode, setMode] = useState<Mode>("recruiter");

  // LocalStorage check taaki page refresh par mode save rahe
  useEffect(() => {
    const savedMode = localStorage.getItem("portfolioMode") as Mode;
    if (savedMode) setMode(savedMode);
  }, []);

  const toggleMode = () => {
    setMode((prev) => {
      const newMode = prev === "recruiter" ? "developer" : "recruiter";
      localStorage.setItem("portfolioMode", newMode);
      return newMode;
    });
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
}