import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sendToDiscordWebhook(
  webhookUrl: string,
  data: Record<string, any>
): Promise<Response> {
  const payload = {
    content: "New search query from ArchiVintage:",
    embeds: [
      {
        title: "People Search Query",
        color: 8531219, // Brown color in decimal
        fields: Object.entries(data).map(([key, value]) => {
          return {
            name: formatFilterName(key),
            value: value === true ? "Yes" : value === false ? "No" : value || "Not specified",
            inline: true,
          };
        }),
        footer: {
          text: "ArchiVintage People Search",
        },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  return fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export function formatFilterName(key: string): string {
  // Convert camelCase to Title Case with spaces
  const formatted = key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
  
  return formatted;
}

export function animateElement(element: HTMLElement, animationName: string, duration: number = 800): void {
  element.style.animation = `${animationName} ${duration}ms`;
  
  setTimeout(() => {
    element.style.animation = '';
  }, duration);
}
