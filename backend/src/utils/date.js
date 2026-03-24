export function getUtcDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}
