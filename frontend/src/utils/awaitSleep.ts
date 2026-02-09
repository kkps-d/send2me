export function awaitSleep(seconds: number): Promise<void> {
  return new Promise((resolve) => {
    if (seconds <= 0) return resolve();
    setTimeout(resolve, seconds * 1000);
  });
}
