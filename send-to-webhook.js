#!/usr/bin/env node

// A simple script to send data to the Clay webhook endpoint
// Run with: node send-to-webhook.js

const fetch = require('node-fetch');

// Replace with your actual deployed URL
const WEBHOOK_URL = 'https://clay-autonomous.vercel.app/api/clay-webhook';

// Example lead data - this simulates the data your friend would send
const exampleData = [
    {
        name: "Jane Smith",
        title: "CTO",
        company: "TechCorp",
        email: "jane.smith@techcorp.com",
        phone: "+1-555-987-6543",
        linkedin: "linkedin.com/in/janesmith",
        industry: "Software",
        location: "New York, NY",
        companySize: "201-500",
        revenue: "$50M-$100M",
        notes: "Recently raised Series B funding",
        timestamp: new Date().toISOString()
    },
    {
        name: "Michael Johnson",
        title: "VP of Marketing",
        company: "Growth Industries",
        email: "michael.johnson@growth.co",
        phone: "+1-555-456-7890",
        linkedin: "linkedin.com/in/michaeljohnson",
        industry: "Marketing",
        location: "Austin, TX",
        companySize: "51-200",
        revenue: "$10M-$50M",
        notes: "Looking for new marketing automation solutions",
        timestamp: new Date().toISOString()
    },
    {
        name: "Sarah Williams",
        title: "Head of Sales",
        company: "Global Solutions Inc",
        email: "sarah.w@globalsolutions.com",
        phone: "+1-555-234-5678",
        linkedin: "linkedin.com/in/sarahwilliams",
        industry: "Business Services",
        location: "Chicago, IL",
        companySize: "1001-5000",
        revenue: "$100M-$500M",
        notes: "Expanding into European markets next quarter",
        timestamp: new Date().toISOString()
    }
];

async function sendToWebhook() {
    console.log(`Sending data to webhook: ${WEBHOOK_URL}`);

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(exampleData),
        });

        const data = await response.json();

        if (data.success) {
            console.log('✅ Success! Data sent to webhook.');
            console.log('Response:', data);
        } else {
            console.error('❌ Error from webhook:', data);
        }
    } catch (error) {
        console.error('❌ Failed to send data to webhook:', error.message);
    }
}

// Execute the function
sendToWebhook();

console.log('\n👉 Note: After running this script, the data should appear automatically on your website.');
console.log('   Visit https://clay-autonomous.vercel.app to see the results.'); 