export function getPreferredColorScheme() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  } else {
    // 'light' is the default if no preference is set or 'light' is explicitly preferred
    return "light";
  }
}
