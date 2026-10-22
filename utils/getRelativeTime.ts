export function getRelativeTime(timestamp: string): string {
  const past = new Date(timestamp).getTime();
  const now = Date.now();

  const diffInMs = Math.abs(now - past);

  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hour = Math.floor(minutes / 60);
  const day = Math.floor(hour / 24);

  if (day > 7) return "";
  if (day >= 1) return `${day}day ago`;
  if (hour >= 1) return `${hour}hr ago`;
  if (minutes >= 1) return `${minutes}min ago`;
  return `${seconds}s ago`;
}
