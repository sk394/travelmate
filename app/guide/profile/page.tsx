import GuideProfile from "@/components/guide/guide-profile";
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

    const { data } = await supabase.from('guides').select().eq('id', session.user.id).single();

    if (!data) {
        notFound();
    }


    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GuideProfile guide={data} />
        </Suspense>
    );
}

