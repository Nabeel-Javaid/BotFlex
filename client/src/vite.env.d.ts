/// <reference types="vite/client" />

interface ImportMetaEnv {
  // add env vars here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Add window.__ENV__ type for server-injected environment variables
interface Window {
  __ENV__?: {
    [key: string]: string | undefined
  }
}