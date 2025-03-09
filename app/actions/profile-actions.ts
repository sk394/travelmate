"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateRating(rating: number, guideId: string, numRatings: number, currentRating: number) {
    const supabase = createServerComponentClient<Database>({ cookies });
    const newAverageRating = (currentRating * numRatings + rating) / (numRatings + 1);

    // Step 3: Update the average_rating and increment numRatings
    const { data, error: updateError } = await supabase
        .from('guides')
        .update({
            average_rating: newAverageRating,
            num_of_ratings: numRatings + 1,
        })
        .eq('id', guideId);

    if (updateError) {
        console.error(updateError);
        return updateError;
    }
    revalidatePath(`/guide/profile/${guideId}`);
}