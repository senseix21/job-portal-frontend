import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const givenDate = new Date(dateString);
  const now = new Date();

  // Calculate difference in time (in milliseconds)
  const diff = now.getTime() - givenDate.getTime();

  // Convert difference to days
  const daysAgo = Math.floor(diff / (1000 * 60 * 60 * 24));

  // Determine output based on the daysAgo
  switch (daysAgo) {
    case 0:
      return "today";
    case 1:
      return "1 day ago";
    default:
      return `${daysAgo} days ago`;
  }
}

// Example Usage
const exampleDate = "2024-12-17T05:13:38.647Z";
console.log(formatDate(exampleDate)); // Output: "2 days ago" (if today is 2024-12-19)
