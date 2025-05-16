// This is a convenience endpoint to test the Clay callback without needing an external tool
// It simulates your friend sending processed data back to your application

import sampleLeads from './sample-leads';

export default function handler(req, res) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Get the sample data with unique timestamp
        const timestamp = new Date().toISOString();
        const entryId = `entry-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

        const testData = {
            ...sampleLeads,
            timestamp,
            _entryId: entryId,
            _receivedAt: timestamp,
            message: "This is simulated data for testing purposes"
        };

        // Initialize global.clayResponseData as an array if it doesn't exist
        if (!global.clayResponseData) {
            global.clayResponseData = [];
        } else if (!Array.isArray(global.clayResponseData)) {
            // Convert to array if it's not already
            global.clayResponseData = [global.clayResponseData];
        }

        // Add the new test data to the existing array
        global.clayResponseData.push(testData);

        // Return a success response
        return res.status(200).json({
            success: true,
            message: 'Test data added successfully! Click "Check for Results" to see it on the page.',
            totalEntries: global.clayResponseData.length
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