// Webhook endpoint to receive data from Clay API
// This will store all data received for display on the frontend

// Simple in-memory storage
// In a production app, use a database instead
let accumulatedResults = [];
let lastUpdated = null;

export default async function handler(req, res) {
    // Accept GET to retrieve stored results and POST to receive new results
    if (req.method === 'GET') {
        // Return the stored results
        return res.status(200).json({
            success: true,
            results: accumulatedResults,
            lastUpdated
        });
    } else if (req.method === 'POST') {
        try {
            // Store the incoming data
            const data = req.body;
            console.log('Received webhook data:', data);

            // Generate a unique ID for this data entry
            const timestamp = new Date().toISOString();
            const entryId = `entry-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

            // Process the data to add metadata
            const processedData = Array.isArray(data)
                ? data.map(item => ({
                    ...item,
                    _entryId: entryId,
                    _receivedAt: timestamp
                }))
                : [{
                    ...data,
                    _entryId: entryId,
                    _receivedAt: timestamp
                }];

            // Add to our accumulated results instead of replacing
            accumulatedResults = [...accumulatedResults, ...processedData];
            lastUpdated = timestamp;

            // Return success response
            return res.status(200).json({
                success: true,
                message: 'Webhook data received and accumulated successfully',
                totalEntries: accumulatedResults.length
            });
        } catch (error) {
            console.error('Error processing webhook:', error);
            return res.status(500).json({
                success: false,
                message: 'Error processing webhook data',
                error: error.message
            });
        }
    } else if (req.method === 'DELETE') {
        // Clear all stored results
        accumulatedResults = [];
        lastUpdated = null;

        return res.status(200).json({
            success: true,
            message: 'All results cleared successfully'
        });
    } else {
        // Method not allowed
        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        });
    }
} 