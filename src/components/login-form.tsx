'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { Icons } from './icons';

const FAKE_USERS = {
    "hr@hyundai.com": { password: "password123", role: "hr" },
    "employee@hyundai.com": { password: "password123", role: "employee" },
};

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (localStorage.getItem('hyundai-intern-connect-auth') === 'true') {
      const role = localStorage.getItem('hyundai-user-role');
      if (role === 'hr') {
        router.replace('/');
      } else {
        router.replace('/submit-referral');
      }
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const user = FAKE_USERS[email.toLowerCase() as keyof typeof FAKE_USERS];

      if (user && password === user.password) {
        localStorage.setItem('hyundai-intern-connect-auth', 'true');
        localStorage.setItem('hyundai-user-role', user.role);

        toast({
          title: "Login Successful",
          description: "Redirecting to your dashboard...",
        });

        if (user.role === 'hr') {
            router.push('/');
        } else {
            router.push('/submit-referral');
        }

      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Invalid email or password.",
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
        <CardHeader className="items-center text-center">
            <Icons.HyundaiLogo className="h-10 w-auto text-primary" />
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="hr@hyundai.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              placeholder="password123"
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
