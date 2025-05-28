export function formatDate(input) {
  const date = new Date(input);

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function convertUtcToLocalDate(utcDate) {
  return new Date(utcDate);
}

export function convertLocalToUtc(localDate) {
  const dateObj = localDate instanceof Date ? localDate : new Date(localDate);
  return dateObj.toISOString();
}

export function incrementDate(dateString) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + 1);
  return date
}