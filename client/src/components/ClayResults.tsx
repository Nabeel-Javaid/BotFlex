import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Icons } from './icons';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Skeleton } from './ui/skeleton';
import { AlertCircle, CheckCircle2, RefreshCw, Trash2, Phone, Mail } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Input } from './ui/input';

// Type for the results
interface ResultData {
    [key: string]: any;
    _entryId?: string;
    _receivedAt?: string;
    timestamp?: string;
}

interface WebhookResponse {
    success: boolean;
    results: ResultData[];
    lastUpdated: string | null;
}

export default function ClayResults() {
    const [results, setResults] = useState<ResultData[]>([]);
    const [lastUpdated, setLastUpdated] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [showEmailDialog, setShowEmailDialog] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<number>(0);
    const [customEmail, setCustomEmail] = useState('');

    // Email templates
    const emailTemplates = [
        {
            subject: "How lean SaaS teams are scaling without adding headcount",
            body: `Hello,

Saw that you're part of a fast-growing SaaS team in NYC—so I'll keep this relevant.

A lot of teams your size (11–50) are hitting a growth ceiling—not because of product or demand, but because the manual stuff in sales and onboarding doesn't scale.

We're helping tech companies automate key parts of the funnel—lead response, qualification, appointment setting—using custom AI agents trained on your sales playbook.

No bots that sound like bots. Just more closed deals, less overhead.

Curious to hear how you're thinking about this. Want to swap notes?

Best,
Your Name
Your Company`
        },
        {
            subject: "Automating sales workflows for NYC SaaS teams",
            body: `Hello,

I noticed your company is in the 11–50 range—perfect stage to streamline sales ops before scaling.

We've helped SaaS startups like [ClientName] automate lead follow-up and qualification using custom AI workflows (built with VAPI + Clay + Make). Result? 3x more booked calls, 40% less ops overhead.

If you're exploring AI in your GTM, I'd love to share how we do it.

Want to grab 15 minutes?

Cheers,
Your Name
Your Company
Your Calendly`
        },
        {
            subject: "Manual follow-ups killing your pipeline?",
            body: `Hello,

SaaS founders and GTM leaders I speak with in NYC all say the same thing:

"We're losing leads because we just don't have the bandwidth to follow up fast enough."

Is that something you're seeing too?

We're helping tech teams automate the first 5–10 touches with leads—so your reps focus only on deals worth closing. One client just cut their CAC by 22% without hiring.

Would a 15-min call next week make sense?

Best,
Your Name`
        }
    ];

    // Function to fetch results from the webhook endpoint
    const fetchResults = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/clay-webhook');

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            const data: WebhookResponse = await response.json();

            if (data.success && data.results) {
                // Sort results by timestamp or _receivedAt (newest first)
                const sortedResults = [...data.results].sort((a, b) => {
                    const timeA = a._receivedAt || a.timestamp || '';
                    const timeB = b._receivedAt || b.timestamp || '';
                    return timeB.localeCompare(timeA);
                });

                setResults(sortedResults);
                setLastUpdated(data.lastUpdated);
                setError(null);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error fetching results');
            console.error('Error fetching results:', err);
        } finally {
            setLoading(false);
        }
    };

    // Function to delete all results
    const deleteAllResults = async () => {
        if (!confirm('Are you sure you want to delete all results? This cannot be undone.')) {
            return;
        }

        try {
            setDeleting(true);
            const response = await fetch('/api/clay-webhook', {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                setResults([]);
                setLastUpdated(null);
                toast({
                    title: "Results cleared",
                    description: "All results have been cleared successfully",
                    duration: 3000,
                });
            } else {
                throw new Error(data.message || 'Failed to clear results');
            }
        } catch (err) {
            toast({
                title: "Error clearing results",
                description: err instanceof Error ? err.message : 'An error occurred',
                variant: "destructive",
                duration: 3000,
            });
            console.error('Error clearing results:', err);
        } finally {
            setDeleting(false);
        }
    };

    // Set up polling
    useEffect(() => {
        // Initial fetch
        fetchResults();

        // Set up polling interval
        const intervalId = setInterval(() => {
            fetchResults();
        }, 5000); // Poll every 5 seconds

        // Clean up on unmount
        return () => clearInterval(intervalId);
    }, []);

    // Function to manually refresh
    const handleRefresh = () => {
        fetchResults();
    };

    // Function to format date
    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Never';
        return new Date(dateString).toLocaleString();
    };

    // Group results by entry ID if available
    const groupedResults = results.reduce((acc, result) => {
        const entryId = result._entryId || 'unknown';
        if (!acc[entryId]) {
            acc[entryId] = [];
        }
        acc[entryId].push(result);
        return acc;
    }, {} as Record<string, ResultData[]>);

    const handleEmailClick = () => {
        setSelectedTemplate(0);
        setCustomEmail('Hello,\n\nI wanted to reach out regarding...\n\nBest,\nYour Name');
        setShowEmailDialog(true);
    };

    // Function to simulate sending an email (doesn't actually do anything)
    const handleSendEmail = () => {
        setShowEmailDialog(false);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Clay API Results</h2>
                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => { }}
                        title="Call contact"
                    >
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleEmailClick}
                        title="Email contact"
                    >
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefresh}
                        disabled={loading}
                    >
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={deleteAllResults}
                        disabled={deleting || results.length === 0}
                        title="Delete all results"
                    >
                        <Trash2 className={`h-4 w-4 ${deleting ? 'opacity-50' : ''}`} />
                    </Button>
                </div>
            </div>

            {/* Email Templates Dialog */}
            <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Email Templates</DialogTitle>
                        <DialogDescription>
                            Select a template or create your own email.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        <RadioGroup value={selectedTemplate.toString()} onValueChange={(value) => setSelectedTemplate(parseInt(value))}>
                            {emailTemplates.map((template, index) => (
                                <div key={index} className="flex items-start space-x-2 mb-4 pb-4 border-b">
                                    <RadioGroupItem value={index.toString()} id={`template-${index}`} className="mt-1" />
                                    <div className="flex-1">
                                        <Label htmlFor={`template-${index}`} className="font-medium">
                                            {template.subject}
                                        </Label>
                                        <pre className="mt-2 text-sm whitespace-pre-wrap font-sans">{template.body}</pre>
                                    </div>
                                </div>
                            ))}

                            <div className="flex items-start space-x-2">
                                <RadioGroupItem value="3" id="custom-template" className="mt-1" />
                                <div className="flex-1">
                                    <Label htmlFor="custom-template" className="font-medium">
                                        Your own email
                                    </Label>
                                    <Textarea
                                        className="mt-2"
                                        placeholder="Enter your custom email here"
                                        value={customEmail}
                                        onChange={(e) => setCustomEmail(e.target.value)}
                                        rows={10}
                                    />
                                </div>
                            </div>
                        </RadioGroup>
                    </div>

                    <DialogFooter className="mt-4 flex justify-end">
                        <Button type="submit" onClick={handleSendEmail}>
                            Send Email
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {lastUpdated && (
                <div className="text-sm text-gray-500">
                    Last updated: {formatDate(lastUpdated)}
                    {results.length > 0 && <span> • {results.length} total entries</span>}
                </div>
            )}

            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {loading && results.length === 0 ? (
                <div className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-32 w-full" />
                </div>
            ) : results.length > 0 ? (
                <Tabs defaultValue="table" className="w-full">
                    <TabsList>
                        <TabsTrigger value="table">Table View</TabsTrigger>
                        <TabsTrigger value="json">JSON View</TabsTrigger>
                    </TabsList>

                    <TabsContent value="table" className="space-y-4">
                        {results.map((result, index) => (
                            <Card key={result._entryId || index} className="overflow-hidden">
                                <CardHeader className="bg-muted pb-2">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-lg">
                                            Entry #{results.length - index}
                                            {result.company && ` - ${result.company}`}
                                        </CardTitle>
                                        <Badge variant="outline">
                                            {formatDate(result._receivedAt || result.timestamp || null)}
                                        </Badge>
                                    </div>
                                    {result._entryId && (
                                        <CardDescription>
                                            ID: {result._entryId}
                                        </CardDescription>
                                    )}
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {Object.entries(result)
                                            .filter(([key]) => !key.startsWith('_')) // Hide internal fields
                                            .map(([key, value]) => (
                                                <div key={key} className="space-y-1">
                                                    <div className="font-medium text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                                                    <div className="text-sm">
                                                        {Array.isArray(value) ? (
                                                            <div className="flex flex-wrap gap-1">
                                                                {value.map((item, i) => (
                                                                    <Badge key={i} variant="outline">{item}</Badge>
                                                                ))}
                                                                {value.length === 0 && <span className="text-muted-foreground">None</span>}
                                                            </div>
                                                        ) : typeof value === 'object' && value !== null ? (
                                                            <pre className="text-xs bg-muted p-2 rounded-md overflow-auto">
                                                                {JSON.stringify(value, null, 2)}
                                                            </pre>
                                                        ) : (
                                                            String(value)
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </TabsContent>

                    <TabsContent value="json">
                        <Card>
                            <CardHeader>
                                <CardTitle>Raw JSON Data</CardTitle>
                                <CardDescription>
                                    Complete data as received from Clay API ({results.length} entries)
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <pre className="bg-muted p-4 rounded-md overflow-auto text-xs">
                                    {JSON.stringify(results, null, 2)}
                                </pre>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            ) : (
                <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>No Data Yet</AlertTitle>
                    <AlertDescription>
                        Waiting for data from Clay API. When someone sends data to your webhook,
                        it will automatically appear here.
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
} 