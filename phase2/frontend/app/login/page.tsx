import LoginForm from '@/components/auth/login-form';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-white">
          Todo App
        </h1>
        <p className="mt-2 text-center text-sm text-[#d4d4d4]">
          Sign in to your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <LoginForm />

        <div className="mt-6 text-center">
          <p className="text-sm text-[#d4d4d4]">
            Don't have an account?{' '}
            <Link href="/register" className="font-medium text-blue-500 hover:text-blue-400">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}