import SetUpProfileComponent from "@/components/setup-profile";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function SetUpProfile() {
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
        return null;
    }
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
    if (profile) {
        if (profile.role === 'guide') {
            redirect('/guide');
        } else if (profile.role === 'traveler') {
            redirect('/traveler');
        }
    }
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SetUpProfileComponent userId={session?.user.id ?? ''} />
        </Suspense>
    )
}