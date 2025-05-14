// Sample leads data format to help your friend understand what to send back
const sampleLeads = {
    leads: [
        {
            id: "lead1",
            name: "John Smith",
            title: "CEO",
            company: "Acme Technologies",
            location: "San Francisco, CA",
            email: "john@acmetech.com",
            phone: "+1 (555) 123-4567",
            linkedin: "https://linkedin.com/in/johnsmith"
        },
        {
            id: "lead2",
            name: "Sarah Johnson",
            title: "CTO",
            company: "Innovate Solutions",
            location: "New York, NY",
            email: "sarah@innovatesolutions.com",
            phone: "+1 (555) 987-6543",
            linkedin: "https://linkedin.com/in/sarahjohnson"
        },
        {
            id: "lead3",
            name: "Michael Chen",
            title: "VP of Sales",
            company: "Global Partners",
            location: "Chicago, IL",
            email: "michael@globalpartners.com",
            phone: "+1 (555) 456-7890",
            linkedin: "https://linkedin.com/in/michaelchen"
        }
    ],
    timestamp: new Date().toISOString(),
    query: {
        companySize: "51-200",
        industry: "Technology",
        jobLevels: ["c_level", "vp"]
    }
};

// This is just a sample file to help understand the data format
// Not actually used in the application
export default sampleLeads; 