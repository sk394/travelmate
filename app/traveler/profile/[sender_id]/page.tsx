import TravelerProfilePage from "@/components/traveler-profile/profile";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

export default async function ProfilePage({ params }: { params: { sender_id: string } }) {
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        redirect("/login");
    }

    const { data } = await supabase.from('travelers').select().eq('id', params?.sender_id).single();

    if (!data) {
        notFound();
    }


    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TravelerProfilePage traveler={data} userId={session.user.id} tripInfo={[]} showEdit={session.user.id === params.sender_id} />
        </Suspense>
    );
}
