# Botflux Application

A frontend-only application for searching people based on various criteria. Built with React, Vite, and Supabase.

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env.local` file in the root with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Run the development server:
   ```
   npm run dev
   ```

## Deployment to Vercel

This application is ready to deploy on Vercel:

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Import the project in Vercel
3. Add the following environment variables in Vercel project settings:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

Vercel will automatically detect the Vite configuration and deploy your application correctly.

## Project Structure

```
/
├── client/              # Frontend code
│   └── src/
│       ├── components/  # UI components
│       ├── contexts/    # Context providers (Auth, etc.)
│       ├── hooks/       # Custom React hooks
│       ├── lib/         # Utility functions and API client
│       └── pages/       # Application pages
├── shared/              # Shared types and schemas
├── index.html           # Entry HTML file
├── vite.config.ts       # Vite configuration
└── vercel.json          # Vercel deployment configuration
```

## Features

- User authentication with Supabase
- Botflux with multiple filters
- Responsive design with Tailwind CSS
- Form validation with Zod and React Hook Form

## Technology Stack

- React 18
- TypeScript
- Vite
- Supabase for authentication and data storage
- Tailwind CSS for styling
- Radix UI components
- Zod for validation
- React Hook Form for form handling
- React Query for data fetching 