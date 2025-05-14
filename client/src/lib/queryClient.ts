import { QueryClient } from "@tanstack/react-query";
import { supabase } from "./supabase";

// Create the React Query client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

// Helper to handle errors
export async function handleApiError(error: any): Promise<never> {
  console.error("API error:", error);
  let message = "An unknown error occurred";

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = error.message as string;
  }

  throw new Error(message);
}
