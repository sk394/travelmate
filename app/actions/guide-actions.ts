"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateGuidePhotos(guideId: string, photoUrls: string[]) {
    try {
        const supabase = createServerComponentClient({ cookies });
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            throw new Error("User not found");
        }

        const { data: currentGuide, error: fetchError } = await supabase
            .from("guides")
            .select("photo_urls")
            .eq("id", guideId)
            .single();

        if (fetchError) {
            return {
                success: false,
                error: `Failed to fetch guide: ${fetchError.message}`,
            };
        }

        // Combine existing and new photo URLs (avoiding duplicates)
        const existingUrls = currentGuide.photo_urls || [];
        const combinedUrls = Array.from(new Set(existingUrls.concat(photoUrls)));

        // Update the guide with the combined photo_urls
        const { error: _ } = await supabase
            .from("guides")
            .update({ photo_urls: combinedUrls })
            .eq("id", guideId);

        revalidatePath(`/guide/profile`);
        return {
            success: true,
            message: "Photo URLs updated successfully",
            photoUrls: combinedUrls,
        };
    } catch (error) {
        return {
            success: false,
            error: `Unexpected error: ${(error as Error).message}`,
        };
    }
}