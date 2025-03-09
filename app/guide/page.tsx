import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import PostsFilter from "@/components/guide/post-filter";
import TravellerPosts from "@/components/guide/traveler-posts";

type SearchParams = { [key: string]: string | string[] | undefined };
export default async function DashboardPage({ searchParams }: { searchParams: SearchParams }) {
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        return redirect("/login");
    }
    const { data: isGuide } = await supabase.from('guides').select().eq('id', session.user.id).single();

    if (!isGuide) {
        return <div>Not Authorized!</div>
    }

    const location = searchParams?.location ?? null;
    const startDate = searchParams?.startDate ?? null;
    const endDate = searchParams?.endDate ?? null;
    console.log(searchParams);
    let query = supabase.from('trips').select(`*, bids(*)`).eq('bids.guide_id', session.user.id).order('created_at', { ascending: false });

    if (location) {
        query = query.ilike('destination', `%${location}%`);
    }

    if (startDate && endDate) {
        query = query.gte('start_date', `${startDate}`).lte('end_date', `${endDate}`);
    }
    const { data, error } = await query;
    console.log(data)
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
