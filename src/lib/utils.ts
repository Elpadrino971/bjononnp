import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE_NAME = "Zunau.io";
export const SITE_TAGLINE = "Vibe Code SwiftUI Apps";
export const SITE_DESCRIPTION =
  "The AI-powered vibe coding platform for SwiftUI. Describe your vision, watch your iOS app come to life.";
