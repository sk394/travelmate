"use client";

import {
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

export default function GithubAuthButton() {
  const supabase = createClientComponentClient<Database>();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };

  return (
    <Button className="w-full text-zinc-950 py-6 dark:text-white" variant="outline" type="button" onClick={handleSignIn}>
      <span className="mr-2"><FcGoogle className="h-5 w-5" /> </span>
      <span>Sign in with Google</span>
    </Button>
  );
}
