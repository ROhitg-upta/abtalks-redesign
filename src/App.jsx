import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useContext, useState, useEffect } from "react";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import DayChallenge from "./pages/DayChallenge";

// Theme Context
export const ThemeContext = createContext();
export function useTheme() { return useContext(ThemeContext); }

function App() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("abt-theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("abt-theme", dark ? "dark" : "light");
  }, [dark]);

  const toggle = () => setDark(d => !d);

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/day/:dayNum" element={<DayChallenge />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
