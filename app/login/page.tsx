import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import GithubAuthButton from "../../components/auth/github-auth-button";
import OtpAuthButton from "@/components/auth/otp-auth-button";

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
    <div className="h-screen flex  items-stretch md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className=" z-20 flex items-center text-lg font-medium">
          TRAVELMATE
        </div>
        <div className="relative z-20 mt-auto">
          Empowering travelers to explore the world.This is a new start. The merey beginniong of a new journey.
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

