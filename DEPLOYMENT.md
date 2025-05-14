# Deploying Your Clay Webhook Application to Vercel

This guide provides step-by-step instructions for deploying your application to Vercel to handle Clay API callbacks.

## Prerequisites

- A Vercel account (https://vercel.com)
- Your GitHub, GitLab, or Bitbucket account connected to Vercel
- The code pushed to your repository

## Deployment Steps

1. **Login to Vercel Dashboard**
   - Go to https://vercel.com and login

2. **Create a New Project**
   - Click "Add New" → "Project"
   - Select your repository containing the lead finder application
   - Click "Import"

3. **Configure Project**
   - Keep the default settings, Vercel should detect the framework as Vite
   - The build command should be automatically set to `npm run build`
   - The output directory should be set to `dist`
   - You don't need to modify any environment variables for the API functionality

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your application

5. **Verify Deployment**
   - Once deployed, click on the preview URL to open your application
   - Confirm that the form and UI load correctly
   - Note the deployed URL - this is important for your friend

## Testing the Webhook

Your friend needs to send the processed data back to your webhook URL. The webhook URL will be:

```
https://your-vercel-app.vercel.app/api/clay-webhook
```

They should send a POST request to this URL with the lead data in JSON format. Here's an example using curl:

```bash
curl -X POST \
  https://your-vercel-app.vercel.app/api/clay-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "leads": [
      {
        "name": "John Smith",
        "title": "CEO",
        "company": "Acme Technologies",
        "location": "San Francisco, CA",
        "email": "john@acmetech.com",
        "phone": "+1 (555) 123-4567",
        "linkedin": "https://linkedin.com/in/johnsmith"
      }
    ]
  }'
```

## How the System Works

1. You submit the search form on the frontend
2. The data is sent to Clay API
3. Your friend processes the data in Clay
4. Your friend sends the processed data to your webhook URL (`/api/clay-webhook`)
5. Your application stores the data temporarily in the serverless function
6. The frontend periodically checks for new data via the `/api/get-results` endpoint
7. When new data is available, it's displayed in the Lead Results section

## Troubleshooting

- **Webhook not receiving data**: Verify the correct URL is being used and that the data is being sent as a POST request with JSON content
- **Data not showing in UI**: Try refreshing the page or clicking the "Check for Results" button
- **Error in logs**: Check the Vercel logs in your project dashboard under "Deployments" → select the latest deployment → "Functions" tab

## Additional Resources

For more detailed information about:
- [Vercel Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)
- [Vercel API Routes](https://vercel.com/docs/concepts/functions/serverless-functions/quickstart)
- [Testing Webhooks](https://webhook.site/) - A useful tool for testing webhooks 