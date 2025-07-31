import { LoginForm } from '@/components/login-form';
import { Icons } from '@/components/icons';

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-sky-100 px-4">
      <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
        <div className="text-gray-800 space-y-4">
            <h1 className="text-5xl font-bold leading-tight text-primary">Welcome to Hyundai.</h1>
            <h2 className="text-3xl font-light">Your drive begins here.</h2>
            <p className="text-lg text-gray-600">Connecting innovation with everyday commuting.</p>
            <p className="text-md text-gray-500">Access internal tools, referrals, and updates made exclusively for Hyundai employees and interns.</p>
        </div>
        <div className="w-full max-w-sm">
            <LoginForm />
        </div>
      </div>
    </div>
  );
}
