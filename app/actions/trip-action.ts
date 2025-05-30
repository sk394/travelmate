'use server';

import { tripSchema } from "@/lib/schema";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

type TripFormData = z.infer<typeof tripSchema>;
export async function createTrip(trip: TripFormData) {
    const supabase = createServerComponentClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not found");
    }
    const { data, error } = await supabase.from('trips').insert({
        ...trip,
        traveler_id: user.id
    })
        .select();

    if (error) {
        throw error;
    }

    revalidatePath('/traveler');
    return data[0];
}

export async function deleteTrip(tripId: string) {
    const supabase = createServerComponentClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not found");
    }

    const { error } = await supabase.from('trips').delete().eq('id', tripId);

    if (error) {
        throw error;
    }

    revalidatePath('/traveler');
}

export async function updateTrip(tripId: string, tripDescription: string) {
    const supabase = createServerComponentClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not found");
    }

    const { error } = await supabase.from('trips').update({ description: tripDescription }).eq('id', tripId);

    if (error) {
        throw error;
    }

    revalidatePath('/traveler');
}

export async function completeTrip(tripId: string) {
    const supabase = createServerComponentClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not found");
    }

    const { error } = await supabase.rpc('complete_trip', { trip_id: tripId });

    if (error) {
        throw error;
    }

    redirect('/traveler/payment');
}

export async function cancelTrip(tripId: string) {
    const supabase = createServerComponentClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not found");
    }
    const { error } = await supabase.rpc('cancel_trip', { trip_id: tripId });

    if (error) {
        throw error;
    }

    redirect('/traveler');
}