import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Building, MapPin, Mail, Phone, Clock, ExternalLink, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';

// Lead type - adjust based on what Clay actually sends
interface Lead {
    id?: string;
    name?: string;
    title?: string;
    company?: string;
    location?: string;
    email?: string;
    phone?: string;
    linkedin?: string;
    [key: string]: any; // For other fields
}

interface ApiResponse {
    success: boolean;
    data?: {
        leads?: Lead[];
        [key: string]: any;
    };
    message?: string;
}

export default function LeadResults() {
    const [leads, setLeads] = useState<Lead[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [lastChecked, setLastChecked] = useState<Date | null>(null);
    const { toast } = useToast();

    const fetchResults = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/get-results');
            const data: ApiResponse = await response.json();

            if (data.success && data.data && data.data.leads) {
                setLeads(data.data.leads);
                toast({
                    title: "Lead data received!",
                    description: `Found ${data.data.leads.length} leads from Clay.`,
                    duration: 5000,
                });
            }

            setLastChecked(new Date());
        } catch (error) {
            console.error('Error fetching results:', error);
            toast({
                title: "Error fetching results",
                description: "Couldn't retrieve lead data from the server.",
                variant: "destructive",
                duration: 5000,
            });
        } finally {
            setLoading(false);
        }
    };

    // Fetch results on component mount
    useEffect(() => {
        fetchResults();

        // Set up polling every 30 seconds
        const intervalId = setInterval(fetchResults, 30000);

        return () => clearInterval(intervalId);
    }, []);

    if (loading && !leads) {
        return <LeadResultsSkeleton />;
    }

    return (
        <Card className="mt-8">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Lead Results</CardTitle>
                    <CardDescription>
                        {leads && leads.length > 0
                            ? `${leads.length} leads found matching your criteria`
                            : "Waiting for lead data from Clay..."}
                    </CardDescription>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchResults}
                    disabled={loading}
                    className="flex items-center gap-2"
                >
                    <RefreshCcw className="h-4 w-4" />
                    {loading ? "Checking..." : "Check for Results"}
                </Button>
            </CardHeader>

            {lastChecked && (
                <div className="px-6 pb-2 text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Last checked: {lastChecked.toLocaleTimeString()}
                </div>
            )}

            <CardContent>
                {!leads || leads.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground mb-4">
                            No leads available yet. Your friend is still processing the data in Clay.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Results will appear here automatically when they become available.
                        </p>
                    </div>
                ) : (
                    <ScrollArea className="h-[500px] pr-4">
                        <div className="space-y-4">
                            {leads.map((lead, index) => (
                                <Card key={lead.id || index} className="overflow-hidden border-muted">
                                    <div className="p-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                <User className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-base font-medium">{lead.name || 'Unknown Name'}</h3>
                                                <p className="text-sm text-muted-foreground">{lead.title || 'Unknown Title'}</p>

                                                <div className="mt-3 space-y-2">
                                                    {lead.company && (
                                                        <div className="flex items-center text-sm">
                                                            <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                                                            <span>{lead.company}</span>
                                                        </div>
                                                    )}

                                                    {lead.location && (
                                                        <div className="flex items-center text-sm">
                                                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                                            <span>{lead.location}</span>
                                                        </div>
                                                    )}

                                                    {lead.email && (
                                                        <div className="flex items-center text-sm">
                                                            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                                                            <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline">
                                                                {lead.email}
                                                            </a>
                                                        </div>
                                                    )}

                                                    {lead.phone && (
                                                        <div className="flex items-center text-sm">
                                                            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                                                            <span>{lead.phone}</span>
                                                        </div>
                                                    )}

                                                    {lead.linkedin && (
                                                        <div className="flex items-center text-sm">
                                                            <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
                                                            <a
                                                                href={lead.linkedin}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:underline"
                                                            >
                                                                LinkedIn Profile
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </ScrollArea>
                )}
            </CardContent>
        </Card>
    );
}

function LeadResultsSkeleton() {
    return (
        <Card className="mt-8">
            <CardHeader>
                <Skeleton className="h-6 w-[150px]" />
                <Skeleton className="h-4 w-[200px]" />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-2">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-24 w-full" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
} 