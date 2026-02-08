import RegisterForm from '@/components/auth/register-form';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-white">
          Todo App
        </h1>
        <p className="mt-2 text-center text-sm text-[#d4d4d4]">
          Create your account to get started
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <RegisterForm />

        <div className="mt-6 text-center">
          <p className="text-sm text-[#d4d4d4]">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-blue-500 hover:text-blue-400">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}