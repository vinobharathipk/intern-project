import { AppLayout } from "@/components/app-layout";
import { AuthGuard } from "@/components/auth-guard";
import { ReferralForm } from "@/components/referral-form";

export default function SubmitReferralPage() {
    return (
        <AuthGuard>
            <AppLayout>
                <ReferralForm />
            </AppLayout>
        </AuthGuard>
    );
}
