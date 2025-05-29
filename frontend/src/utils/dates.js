import { parseISO, addDays, format } from "date-fns";

export function formatDate(date) {
  return format(date, "MMMM d, yyyy, h:mm a");
}

export function startDateToUTC(dateString) {
  return parseISO(dateString).toISOString();
}

export function endDateToUTC(dateString) {
  return addDays(parseISO(dateString), 1).toISOString();
}
