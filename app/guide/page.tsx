import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import PostsFilter from "@/components/guide/post-filter";
import TravellerPosts from "@/components/guide/traveler-posts";

export default async function DashboardPage() {
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        return redirect("/login");
    }

    const { data, error } = await supabase.from('trips').select(`*, bids(*)`).eq('bids.guide_id', session.user.id)
        // .rangeAdjacent('during', '[2000-01-01 12:00, 2000-01-01 13:00)')
        // .filter('destination', 'in', ['Paris', 'London', 'New York'])
        // .is('destination', null)
        .order('created_at', { ascending: false });

    return (

        <>
            <div className="flex flex-1 justify-center items-center">
                <PostsFilter />
            </div>
            <div className="flex flex-col mt-4 gap-3 justify-center items-center">
                {data ? <TravellerPosts posts={data} guide_id={session.user.id ?? ""} /> : <div>No trips available</div>}
            </div>
        </>
    )


}
