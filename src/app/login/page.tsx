import { LoginForm } from '@/components/login-form';
import { Icons } from '@/components/icons';

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-background px-4">
       <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1690855214743-9a78bc383669?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          filter: 'blur(2px) brightness(0.6)'
        }}
        data-ai-hint="hyundai car studio"
      ></div>
      <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
        <div className="text-white space-y-4">
            
            <h1 className="text-5xl font-bold leading-tight">Welcome to Hyundai.</h1>
            <h2 className="text-3xl font-light">Your drive begins here.</h2>
            <p className="text-lg text-gray-200">Connecting innovation with everyday commuting.</p>
            <p className="text-md text-gray-300">Access internal tools, referrals, and updates made exclusively for Hyundai employees and interns.</p>
        </div>
        <div className="w-full max-w-sm">
            <LoginForm />
        </div>
      </div>
    </div>
  );
}
