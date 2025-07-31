'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";

const FAKE_PASSWORD = "password123";

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const companyName = 'Hyundai'; // Hardcoded for Hyundai access only
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (localStorage.getItem('hyundai-intern-connect-auth') === 'true') {
      router.replace('/');
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      if (password === FAKE_PASSWORD) {
        localStorage.setItem('hyundai-intern-connect-auth', 'true');
        toast({
          title: "Login Successful",
          description: "Redirecting to your dashboard...",
        });
        router.push('/');
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Invalid password.",
        });
        setIsLoading(false);
      }
    }, 1000);
  };

  if (!isClient) {
    return null; // or a loader
  }

  return (
    <form onSubmit={handleLogin}>
      <Card>
        <CardHeader>
          <CardTitle>Hyundai Staff Login</CardTitle>
          <CardDescription>
            Enter your password to access the portal.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Referral Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
