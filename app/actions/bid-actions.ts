"use server";

import { bidSchema } from "@/lib/schema";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function acceptBid(bidId: string) {
    const supabase = createServerComponentClient<Database>({ cookies });
    const { error } = await supabase.rpc('accept_bid', { bid_id: bidId });

    if (error) {
        console.error('Error accepting bid', error);
        return { error };
    }

    redirect(`/traveler/messages/${bidId}`);
}

export async function createBid(formData: z.infer<typeof bidSchema>) {
    const supabase = createServerComponentClient<Database>({ cookies });
    const { data, error } = await supabase.from('bids').upsert(formData, { onConflict: 'trip_id,guide_id' });

    if (error) {
        console.error('Error creating bid', error);
        return { error };
    }
    revalidatePath('/guide');
    return { data };
}