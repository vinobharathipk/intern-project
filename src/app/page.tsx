
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from "@/components/app-layout";
import { AuthGuard } from "@/components/auth-guard";
import { Dashboard } from "@/components/dashboard";
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const router = useRouter();
  const [isHr, setIsHr] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem('hyundai-user-role');
    if (role === 'employee') {
      router.replace('/submit-referral');
    } else if (role === 'hr') {
      setIsHr(true);
      setIsLoading(false);
    } else {
      // If role is not set or invalid, redirect to login
      router.replace('/login');
    }
  }, [router]);

  if (isLoading) {
    return (
       <AuthGuard>
        <div className="p-4 sm:px-6 sm:py-0 space-y-4">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-48 w-full" />
        </div>
      </AuthGuard>
    )
  }
  
  if (!isHr) {
    return null; // or a redirect component
  }

  return (
    <AuthGuard>
      <AppLayout>
        <Dashboard />
      </AppLayout>
    </AuthGuard>
  );
}
