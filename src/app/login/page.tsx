import { LoginForm } from '@/components/login-form';
import { Icons } from '@/components/icons';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center justify-center text-center mb-8">
            <Icons.HyundaiLogo className="h-16 w-16 text-primary mb-4" />
            <h1 className="text-3xl font-bold text-primary">Intern Connect</h1>
            <p className="text-muted-foreground">Referral Submission Portal</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
