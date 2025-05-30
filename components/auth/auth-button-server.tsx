import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function AuthButtonServer() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
  data: { },
  } = await supabase.auth.getSession();

  // return <AuthButton session={session} />;
}
