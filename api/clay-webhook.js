// This is a serverless function that will receive data
// from your friend after they process it in Clay

export default function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Get the data from the request body
        const processedData = req.body;

        // Log the received data (for debugging)
        console.log('Received data from Clay:', processedData);

        // Store the data in a global variable (accessible by other serverless functions)
        // In production, you might want to use a more persistent storage solution
        global.clayResponseData = processedData;

        // Return a success response
        return res.status(200).json({
            success: true,
            message: 'Data received successfully'
        });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return res.status(500).json({
            success: false,
            message: 'Error processing webhook data'
        });
    }
} 