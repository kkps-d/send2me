import { useState, useEffect, type ReactNode } from "react";
import { AuthContext, type User } from "./AuthContext";
import { BASE_URL } from "../utils/baseUrl";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * TODO: Probably need to convert this to tanstack query to periodically check if the user is stil logged in in the background.
   * Also need to figure out how to detect if fetch requests failed due to 401, then set user to null to signal logged out status
   */
  async function getUser() {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/me`, {
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 401) {
          console.log("User not authed.");
        } else {
          console.error("Unknown error");
          console.error(res);
          // TODO: Show error pop
        }
        return;
      }

      const user = await res.json();
      setUser(user);
      console.log(user);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  async function login(username: string, password: string) {
    setIsLoading(true);
    const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/html",
      },
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: "include",
    });

    if (!res.ok) {
      if (res.status === 401) {
        console.error("Wrong credentials");
        // TODO: Wrong credentials, show error popup
      } else {
        console.error("Unknown error");
        console.error(res);
        // TODO: Unknown error, show error popup
      }
      setIsLoading(false);
      return;
    }

    await getUser();
  }

  async function logout() {}

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
