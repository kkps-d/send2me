import { useState, useEffect, type ReactNode } from "react";
import { AuthContext, type User } from "./AuthContext";
import { BASE_URL } from "../utils/baseUrl";
import {
  LoginError,
  type LoginResult,
} from "../types/Results/auth/LoginResult";
import { Spinner } from "../components/Spinner/Spinner";
import {
  LogoutError,
  type LogoutResult,
} from "../types/Results/auth/LogoutResult";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  if (isLoading) {
    return <Spinner fontSize="3rem" fullscreen />;
  }

  async function login(username: string, password: string) {
    setIsLoading(true);

    const result: LoginResult = {
      success: true,
      errorType: null,
      payload: null,
      rawError: null,
    };

    try {
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
          result.success = false;
          result.errorType = LoginError.WRONG_CREDENTIALS;
        } else {
          result.success = false;
          result.errorType = LoginError.UNKNOWN_ERROR;
          result.rawError = new Error("Unknown HTTP Code", { cause: { res } });
        }
        setIsLoading(false);
        return result;
      }

      await getUser();
    } catch (err) {
      result.success = false;
      result.errorType = LoginError.UNKNOWN_ERROR;
      result.rawError = err;
    }

    setIsLoading(false);
    return result;
  }

  async function logout() {
    setIsLoading(true);

    const result: LogoutResult = {
      success: true,
      errorType: null,
      payload: null,
      rawError: null,
    };

    try {
      const res = await fetch(`${BASE_URL}/api/v1/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 401) {
          result.success = false;
          result.errorType = LogoutError.UNKNOWN_ERROR;
          result.rawError = new Error("Unknown HTTP Code", { cause: { res } });
        }
        setIsLoading(false);
        return result;
      }

      setUser(null);
    } catch (err) {
      result.success = false;
      result.errorType = LogoutError.UNKNOWN_ERROR;
      result.rawError = err;
    }

    setIsLoading(false);
    return result;
  }

  /** Wrapper to override init to include credentials, and also checks if response is 401 to automatically invalidate the token and make user null */
  async function authedFetch(input: URL, init?: RequestInit) {
    const res = await fetch(input, {
      ...init,
      credentials: "include",
    });

    if (res.status === 401) {
      setUser(null);
    }

    return res;
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, authedFetch }}
    >
      {children}
    </AuthContext.Provider>
  );
};
