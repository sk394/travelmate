import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Suspense } from "react";
import { cookies } from "next/headers";
import InitMessages from "./init-messages";
import ListMessages from "./list-messages";


export default async function ChatMessages({ userId, bidId }: { userId: string; bidId: string }) {
    const supabase = createServerComponentClient<Database>({ cookies });
    const { data } = await supabase
        .from('messages')
        .select(`*, 
            user:profiles!messages_sender_id_fkey(
                full_name,
                avatar_url,
                role)`)
        .eq('bid_id', bidId)
        .range(0, 100)
        .order('created_at', { ascending: false });

    return (
        <Suspense fallback={"loading.."}>
            <ListMessages userId={userId} />
            <InitMessages messages={data?.reverse() || []} />
        </Suspense>
    );
}