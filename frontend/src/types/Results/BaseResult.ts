export type BaseResult<T, E> = {
  success: boolean;
  errorType: E | null;
  rawError: unknown;
  payload: T | null;
};
