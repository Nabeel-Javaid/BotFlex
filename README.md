# Clay Autonomous Application

A web application for managing and automating workflows with Clay API. Built with React, Vite, and modern JavaScript tools.

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env.local` file in the root with your environment variables:
   ```
   VITE_API_URL=your_api_url
   ```
4. Run the development server:
   ```
   npm run dev
   ```

## Deployment

This application is ready to deploy:

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Use the provided `deploy.sh` script or follow the instructions in `DEPLOYMENT.md`
3. Set up the required environment variables in your hosting platform

## Project Structure

```
/
├── api/                # API endpoints
│   ├── clay-webhook.js # Clay API webhook handler
│   ├── clay-proxy.js   # Proxy for Clay API requests
│   └── get-results.js  # Fetch results from Clay API
│
├── client/             # Frontend code
│   └── src/
│       ├── components/ # UI components
│       │   ├── ClayResults.tsx  # Results display component
│       │   └── ui/    # UI component library
│       ├── contexts/   # Context providers
│       ├── hooks/      # Custom React hooks
│       ├── lib/        # Utility functions
│       └── pages/      # Application pages
│
├── shared/             # Shared types and schemas
├── index.html          # Entry HTML file
└── vite.config.ts      # Vite configuration
```

## Features

- **Clay API Integration**: Connect with Clay's data enrichment API
- **Webhook Handling**: Receive and process webhook data
- **Real-time Results Display**: View incoming data in real-time
- **Data Management**: Delete and refresh results as needed
- **Email Templates**: Predefined email templates for outreach
- **Communication Tools**: Call and email functionality for leads

## Technology Stack

- **Frontend**:
  - React 18
  - TypeScript
  - Vite
  - Tailwind CSS
  - shadcn/ui components

- **Backend**:
  - Serverless API endpoints
  - Webhook handling
  - Data storage and management

## Component Highlights

### ClayResults Component

The core component displaying webhook results from Clay API with features:

- Automatic polling for new data
- Tabular and JSON views of results
- Email templates for lead communication
- Call and email action buttons
- Results management (refresh, delete)

## Getting Started with Development

1. Review the API implementations in the `/api` directory
2. Explore the frontend components, especially `ClayResults.tsx`
3. Test webhook functionality using the sample data
4. Customize email templates as needed for your outreach 