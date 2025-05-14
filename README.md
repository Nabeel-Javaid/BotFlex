# People Search Application - Clay Integration

A frontend-only application for searching people based on various criteria. Built with React, Vite, and Clay integration.

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```

## Deployment to Vercel

This application is ready to deploy on Vercel:

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Import the project in Vercel
3. No additional environment variables are needed

Vercel will automatically detect the Vite configuration and deploy your application correctly.

## How It Works

1. Users fill out the search form with company and job criteria
2. The form data is sent to Discord for logging
3. Your friend receives the search criteria and processes it in Clay
4. Your friend sends the processed data back to your webhook endpoint
5. The application displays the results from Clay

## Webhook Integration

The application includes a webhook endpoint at `/api/clay-webhook` that receives data from Clay after processing. This data is then displayed in the UI.

## Project Structure

```
/
├── api/                # Serverless functions for webhooks
│   ├── clay-webhook.js # Receives data from Clay
│   └── get-results.js  # Endpoint to retrieve processed data
├── client/             # Frontend code
│   └── src/
│       ├── components/ # UI components
│       ├── contexts/   # Context providers
│       ├── hooks/      # Custom React hooks
│       ├── lib/        # Utility functions and API client
│       └── pages/      # Application pages
├── shared/             # Shared types and schemas
├── index.html          # Entry HTML file
├── vite.config.ts      # Vite configuration
└── vercel.json         # Vercel deployment configuration
```

## Features

- Advanced search form with multiple filters
- Responsive design with Tailwind CSS
- Serverless webhook API for Clay integration
- Real-time lead results display
- Form validation with Zod and React Hook Form

## Technology Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS for styling
- Radix UI components
- Zod for validation
- React Hook Form for form handling
- Vercel Serverless Functions 