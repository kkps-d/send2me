export const BASE_URL =
  window.location.host === "localhost:5173"
    ? `${window.location.protocol}//localhost:5183`
    : "";
