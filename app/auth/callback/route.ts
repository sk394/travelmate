import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }
  return NextResponse.redirect(new URL(`/setup-profile`, requestUrl.origin));
}
