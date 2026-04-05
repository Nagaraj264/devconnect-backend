import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatTime(date) {
  if (!date) return "Long ago";
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}
