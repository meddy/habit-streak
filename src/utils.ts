import { format, parse } from "date-fns";

export function parseDate(dateStr: string): Date {
  return parse(dateStr, "y-MM-dd", new Date());
}

export function formatDate(date: Date): string {
  return format(date, "y-MM-dd");
}

export function today(): string {
  return formatDate(new Date());
}
