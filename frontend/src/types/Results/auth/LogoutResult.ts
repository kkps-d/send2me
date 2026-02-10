import type { BaseResult } from "../BaseResult";

export const LogoutError = {
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
} as const;

export type LogoutResult = BaseResult<void, keyof typeof LogoutError>;
