import { format, parse } from "date-fns";

export function today(): string {
  return format(new Date(), "Y-MM-dd");
}

export function parseDateStr(dateStr: string): Date {
  return parse(dateStr, "y-MM-dd", new Date());
}
