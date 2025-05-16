// This is a serverless function that will return the processed data
// from Clay that was stored by the webhook

export default function handler(req, res) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Check if we have any data
        if (global.clayResponseData) {
            // Make sure clayResponseData is always an array
            const responseData = Array.isArray(global.clayResponseData)
                ? global.clayResponseData
                : [global.clayResponseData];

            // Return the stored data
            return res.status(200).json({
                success: true,
                data: responseData
            });
        } else {
            // No data yet
            return res.status(200).json({
                success: false,
                message: 'No data available yet',
                data: null
            });
        }
    } catch (error) {
        console.error('Error retrieving data:', error);
        return res.status(500).json({
            success: false,
            message: 'Error retrieving processed data',
            error: error.message
        });
    }
} 