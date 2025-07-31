'use client'

import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/app-layout";
import { AuthGuard } from "@/components/auth-guard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";

export default function SubmissionSuccessPage() {
    const router = useRouter();

    return (
        <AuthGuard>
            <AppLayout>
                <div className="flex items-center justify-center py-12">
                    <Card className="w-full max-w-lg text-center">
                        <CardHeader>
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                                <Icons.CheckCircle2 className="h-12 w-12 text-green-600" />
                            </div>
                            <CardTitle className="mt-4 text-2xl font-bold">Submission Successful!</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <p className="text-muted-foreground">
                                Thank you for submitting the intern referral. The details have been successfully recorded in our system. The HR team will review the submission shortly.
                            </p>
                            <div className="flex justify-center gap-4">
                                <Button onClick={() => router.push('/')}>
                                    Back to Dashboard
                                </Button>
                                <Button variant="outline" onClick={() => router.push('/submit-referral')}>
                                    Submit Another Referral
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </AppLayout>
        </AuthGuard>
    );
}
