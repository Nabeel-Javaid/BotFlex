/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  // add more env vars here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Add window.__ENV__ type for server-injected environment variables
interface Window {
  __ENV__?: {
    SUPABASE_URL?: string
    SUPABASE_KEY?: string
    [key: string]: string | undefined
  }
}