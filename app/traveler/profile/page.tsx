import TravelerProfilePage from "@/components/traveler-profile/profile";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

export default async function ProfilePage() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data } = await supabase.from('travelers').select().eq('id', session.user.id).single();
  const { data: tripInfo } = await supabase.from('trips').select("destination").eq('traveler_id', session.user.id).eq('status', 'completed');

  if (!data) {
    notFound();
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TravelerProfilePage
        traveler={data}
        userId={session.user.id}
        tripInfo={tripInfo ?? []}
        showEdit={true}
      />
    </Suspense>
  );
}
