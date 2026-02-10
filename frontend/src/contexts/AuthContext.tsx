import { createContext, useContext } from "react";
import type { LoginResult } from "../types/Results/auth/LoginResult";
import type { LogoutResult } from "../types/Results/auth/LogoutResult";

export type User = {
  username: string;
};

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<LoginResult>;
  logout: () => Promise<LogoutResult>;
  authedFetch: (input: URL, init?: RequestInit) => Promise<Response>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuth = () => useContext(AuthContext)!;
