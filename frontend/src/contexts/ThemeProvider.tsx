import { useEffect, type ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getPreferredColorScheme } from "../utils/getPreferredColorScheme";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [storedValue, setStoredValue] = useLocalStorage(
    "theme",
    getPreferredColorScheme(),
  );

  const setTheme = (theme: "light" | "dark") => {
    setStoredValue(theme);
  };

  const toggleTheme = () => {
    setStoredValue((curr) => (curr === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(storedValue);
  }, [storedValue]);

  return (
    <ThemeContext.Provider
      value={{
        theme: storedValue as "light" | "dark",
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
