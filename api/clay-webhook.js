// Webhook endpoint to receive data from Clay API
// This will store the latest data received for display on the frontend

// Simple in-memory storage
// In a production app, use a database instead
let latestResults = [];
let lastUpdated = null;

export default async function handler(req, res) {
    // Accept GET to retrieve stored results and POST to receive new results
    if (req.method === 'GET') {
        // Return the stored results
        return res.status(200).json({
            success: true,
            results: latestResults,
            lastUpdated
        });
    } else if (req.method === 'POST') {
        try {
            // Store the incoming data
            const data = req.body;
            console.log('Received webhook data:', data);

            // Update our stored results
            latestResults = Array.isArray(data) ? data : [data];
            lastUpdated = new Date().toISOString();

            // Return success response
            return res.status(200).json({
                success: true,
                message: 'Webhook data received and stored successfully'
            });
        } catch (error) {
            console.error('Error processing webhook:', error);
            return res.status(500).json({
                success: false,
                message: 'Error processing webhook data',
                error: error.message
            });
        }
    } else {
        // Method not allowed
        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        });
    }
} 