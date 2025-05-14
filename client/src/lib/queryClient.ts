import { QueryClient } from "@tanstack/react-query";

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

// Export methods that might be used elsewhere but won't do anything
export const invalidateQueries = () => {
  console.log('Query invalidation called, but has no effect in this version')
  return Promise.resolve()
}

export const resetQueries = () => {
  console.log('Query reset called, but has no effect in this version')
  return Promise.resolve()
}
