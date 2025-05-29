import { parseISO, addDays, subDays, format } from "date-fns";

export function formatDate(date) {
  return format(date, "MMMM d, yyyy, h:mm a");
}

export function startDateToUtc(dateString) {
  return parseISO(dateString).toISOString();
}

export function endDateToUtc(dateString) {
  return addDays(parseISO(dateString), 1).toISOString();
}

export function startDateToLocal(utcString) {
  return format(parseISO(utcString), "yyyy-MM-dd");
}

export function endDateToLocal(utcString) {
  return format(subDays(parseISO(utcString), 1), "yyyy-MM-dd");
}
