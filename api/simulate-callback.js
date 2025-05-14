// This is a convenience endpoint to test the Clay callback without needing an external tool
// It simulates your friend sending processed data back to your application

import sampleLeads from './sample-leads';

export default function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Get the sample data
        const testData = {
            ...sampleLeads,
            timestamp: new Date().toISOString(),
            message: "This is simulated data for testing purposes"
        };

        // Store the test data in the global variable (like the real webhook would)
        global.clayResponseData = testData;

        // Return a success response
        return res.status(200).json({
            success: true,
            message: 'Test data loaded successfully! Click "Check for Results" to see it on the page.'
        });
    } catch (error) {
        console.error('Error simulating webhook:', error);
        return res.status(500).json({
            success: false,
            message: 'Error simulating webhook data',
            error: error.message
        });
    }
} 