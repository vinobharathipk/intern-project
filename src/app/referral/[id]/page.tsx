'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AppLayout } from '@/components/app-layout';
import { AuthGuard } from '@/components/auth-guard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import type { Intern } from '@/lib/types';
import { Icons } from '@/components/icons';

export default function ReferralDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const { toast } = useToast();
    
    const [intern, setIntern] = useState<Intern | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const storedInterns = localStorage.getItem('interns');
            if (storedInterns) {
                const interns: Intern[] = JSON.parse(storedInterns);
                const foundIntern = interns.find(i => i.id === id);
                setIntern(foundIntern || null);
            }
        }
        setIsLoading(false);
    }, [id]);

    const handleStatusChange = (newStatus: 'Verified' | 'Rejected') => {
        if (!intern) return;

        const storedInterns = localStorage.getItem('interns');
        if (storedInterns) {
            let interns: Intern[] = JSON.parse(storedInterns);
            interns = interns.map(i => i.id === id ? { ...i, status: newStatus } : i);
            localStorage.setItem('interns', JSON.stringify(interns));
            setIntern(prev => prev ? { ...prev, status: newStatus } : null);
            toast({
                title: "Status Updated",
                description: `Intern status changed to ${newStatus}.`,
            });
        }
    };

    const getStatusVariant = (status: Intern['status']) => {
        switch (status) {
            case 'Verified': return 'default';
            case 'Pending': return 'secondary';
            case 'Rejected': return 'destructive';
            default: return 'outline';
        }
    };
    
    if (isLoading) {
        return (
            <AuthGuard>
                <AppLayout>
                    <Skeleton className="w-full h-[600px]" />
                </AppLayout>
            </AuthGuard>
        );
    }

    if (!intern) {
        return (
             <AuthGuard>
                <AppLayout>
                    <div className="flex flex-col items-center justify-center text-center py-12">
                        <Icons.FileText className="w-16 h-16 text-muted-foreground mb-4" />
                        <h1 className="text-2xl font-bold">Referral Not Found</h1>
                        <p className="text-muted-foreground mb-6">The referral with ID '{id}' could not be found.</p>
                        <Button onClick={() => router.push('/')}>Back to Dashboard</Button>
                    </div>
                </AppLayout>
            </AuthGuard>
        );
    }
    
    const DetailItem = ({ label, value }: { label: string, value: React.ReactNode }) => (
        <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-base">{value}</p>
        </div>
    );
    
    const DocumentLink = ({ label, dataUrl }: { label: string, dataUrl?: string }) => (
        <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            {dataUrl ? (
                <a href={dataUrl} target="_blank" rel="noopener noreferrer" className="text-base text-primary hover:underline flex items-center gap-2">
                    <Icons.FileUp className="w-4 h-4" />
                    View Document
                </a>
            ) : (
                <p className="text-base text-muted-foreground">Not provided</p>
            )}
        </div>
    );

    return (
        <AuthGuard>
            <AppLayout>
                <div className="max-w-4xl mx-auto py-8">
                     <Button variant="outline" onClick={() => router.back()} className="mb-4">
                        <Icons.ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Button>
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-2xl">{intern.studentName}</CardTitle>
                                    <CardDescription>Referral ID: {intern.id}</CardDescription>
                                </div>
                                <Badge variant={getStatusVariant(intern.status)} className="text-sm">{intern.status}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Separator />
                            <h3 className="text-lg font-semibold text-primary">Student Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <DetailItem label="Email" value={intern.email} />
                                <DetailItem label="Phone" value={intern.phone} />
                                <DetailItem label="Degree" value={intern.degree} />
                                <DetailItem label="College" value={intern.college} />
                                <DetailItem label="HOD Email" value={intern.hodEmail} />
                                <DetailItem label="Preferred Department" value={intern.department} />
                                <DetailItem label="Internship Type" value={intern.internshipType} />
                                <DetailItem label="Submission Date" value={intern.submissionDate} />
                            </div>
                            <Separator />
                            <h3 className="text-lg font-semibold text-primary">Referral Information</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <DetailItem label="Referred By" value={intern.referralName} />
                            </div>

                             <Separator />
                            <h3 className="text-lg font-semibold text-primary">Submitted Documents</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                <DocumentLink label="Resume" dataUrl={intern.resume} />
                                <DocumentLink label="Bonafide Certificate" dataUrl={intern.bonafideCertificate} />
                                <DocumentLink label="Student ID" dataUrl={intern.studentId} />
                                <DocumentLink label="Vaccination Certificate" dataUrl={intern.vaccinationCertificate} />
                            </div>
                        </CardContent>
                        <CardFooter className="bg-muted/50 px-6 py-4 flex justify-end gap-2">
                           <Button variant="destructive" onClick={() => handleStatusChange('Rejected')} disabled={intern.status === 'Rejected'}>
                               <Icons.XCircle className="mr-2 h-4 w-4" />
                               Reject
                           </Button>
                           <Button onClick={() => handleStatusChange('Verified')} disabled={intern.status === 'Verified'}>
                               <Icons.CheckCircle className="mr-2 h-4 w-4" />
                               Verify
                           </Button>
                        </CardFooter>
                    </Card>
                </div>
            </AppLayout>
        </AuthGuard>
    );
}
