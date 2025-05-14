// Vercel MCP (Multi-Cloud Platform) Serverless Function for Clay API proxy
import fetch from 'node-fetch';

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const CLAY_WEBHOOK_URL = 'https://api.clay.com/v3/sources/webhook/pull-in-data-from-a-webhook-9b7961bf-0334-478c-b9ee-8bb3b8062135';

        // Forward the request to Clay API
        const response = await fetch(CLAY_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'https://clay-autonomous.vercel.app'
            },
            body: JSON.stringify(req.body),
        });

        // Get the response data
        const data = await response.text();

        // Return the response from Clay API
        return res.status(response.status).send(data);
    } catch (error) {
        console.error('Error proxying to Clay API:', error);
        return res.status(500).json({
            error: 'Failed to proxy request to Clay API',
            message: error.message
        });
    }
} 