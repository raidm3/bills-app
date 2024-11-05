import BillsLogo from '@/app/ui/bills-logo';
import LoginForm from '@/app/ui/login-form';
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 md:-mt-32">
        <LoginForm />
      </div>
    </main>
  );
}
