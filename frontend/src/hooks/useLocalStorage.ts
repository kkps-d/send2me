import { useState, useEffect, type Dispatch, type SetStateAction } from "react";

export function useLocalStorage(
  key: string,
  initialValue: string,
): [string, Dispatch<SetStateAction<string>>] {
  const [storedValue, setStoredValue] = useState<string>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    const item = window.localStorage.getItem(key);
    return item ? item : initialValue;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, storedValue);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
