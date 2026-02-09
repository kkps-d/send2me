import type { BaseResult } from "./BaseResult";

export const LoginError = {
  WRONG_CREDENTIALS: "WRONG_CREDENTIALS",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
} as const;

export type LoginResult = BaseResult<void, keyof typeof LoginError>;
