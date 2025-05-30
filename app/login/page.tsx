import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import GithubAuthButton from "../../components/auth/github-auth-button";
import OtpAuthButton from "@/components/auth/otp-auth-button";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default async function Login() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase.from('profiles').select().eq('id', user?.id ?? "").single();

  if (user) {
    if (profile?.role === 'guide') return redirect('/guide');
    if (profile?.role === 'traveler') return redirect('/traveler');
  }

  return (
    <div className="h-screen flex flex-col lg:grid lg:grid-cols-2">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center mb-4 h-[70vh]">
          <Image src="/login_image.png" alt="Login Image" width={500} height={100}
            className="w-full max-h-full max-w-full rounded-full object-center shadow-xl dark:shadow-gray-800 transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30" />
        </div>

        <div className="mt-auto relative z-20 font-sans-serif leading-tight tracking-tight flex flex-row pt-2 gap-2">
          <svg className="w-8 h-8 text-gray-400 dark:text-gray-600 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
          </svg>
          <blockquote className="italic text-white">
            &quot;Empowering travelers to explore the world.This is a new start. The merey beginniong of a new journey.&quot;
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center p-4 lg:p-8 justify-center">
        <div className="mx-auto flex w-full flex-col justify-center items-center space-y-6 sm:w-[350px]">
          <div className="text-center text-md text-muted-foreground justify-between">
            <h4 className="text-xl text-white">Start now!</h4>
            <p>Start your journey in just a few steps.</p>
          </div>
          <GithubAuthButton />
          <OtpAuthButton />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

