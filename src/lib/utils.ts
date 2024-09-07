import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSlugFromString(input: string): string {
  return input
      .normalize("NFD")                       // Normalize the string to decompose special characters
      .replace(/[\u0300-\u036f]/g, "")         // Remove diacritics (accents)
      .toLowerCase()                           // Convert the string to lowercase
      .replace(/[^\w\s]/g, "")                 // Remove all non-word characters except for spaces
      .replace(/\s+/g, "-");                   // Replace spaces with hyphens
}

export function createQueryString(params: URLSearchParams, name: string, value: string, toDelete: string[] = []): string {
  const updatedParams = new URLSearchParams(params.toString());
  updatedParams.set(name, value);
  
  toDelete.forEach(param => updatedParams.delete(param));

  return updatedParams.toString();
}