import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import TripForm from "@/components/trips/trip-form";
import { Suspense } from "react";
import TripPost from "@/components/trips/trip-post";

export default async function DashboardPage() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data } = await supabase.from('trips').select(`
    *,
    profiles!trips_traveler_id_fkey (
      travelers(
      full_name,
      photo_url)
    )
  `).eq("traveler_id", user.id).order('created_at', { ascending: false });

  const trips = (data as any)?.map((trip: any) => ({
    ...trip,
    profiles: {
      travelers: trip.profiles?.travelers ?? {
        full_name: '',
        photo_url: null
      }
    }
  })) as TripWithProfile[];


  return (
    <>
      <div className="flex flex-1 justify-center items-center">
        <TripForm />
      </div>
      <div className="flex flex-col mt-4 gap-3 justify-center items-center">
        {trips.length !== 0 ? <TripPost posts={trips} /> :
          <div className="flex flex-col items-center justify-center mt-10  w-1/3 gap-y-3">
            <h1 className="text-5xl font-semibold ">Uncharted Destinations Await –: </h1>
            <h3 className="flex text-nowrap text-6xl font-bold">Plan Your First Trip!
            </h3>

          </div>}
      </div>
    </>

  )
}


