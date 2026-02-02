import { createContext, useContext } from "react";

export type User = {
  username: string;
};

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  authedFetch: (input: URL, init?: RequestInit) => Promise<Response>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuth = () => useContext(AuthContext)!;
