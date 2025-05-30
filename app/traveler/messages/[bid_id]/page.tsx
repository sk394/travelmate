import ChatInput from "@/components/messages/chat-input";
import ChatMessages from "@/components/messages/chat-messages";
import FinalizeTrip from "@/components/messages/finalize-trip";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";


export default async function MessagesPage({ params, searchParams }: { params: { bid_id: string }; searchParams: { [key: string]: string } }) {
    // get query params
    const { trip_id } = await searchParams;

    const supabase = createServerComponentClient<Database>({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    const { data } = await supabase.from('profiles').select().eq('id', session?.user.id ?? "").single();


    if (!data) {
        notFound();
    }

    return (
        <>
            <div className="max-w-3xl mx-auto md:py-10 h-screen">
                <div className="h-full border rounded-md flex flex-col relative">
                    <div className="h-20">
                        <div className="p-5 border-b flex items-center justify-between h-full">
                            <div>
                                <h1 className="text-xl font-bold">Messages</h1>
                            </div>
                            <FinalizeTrip tripId={trip_id} />
                            <div>
                                <h1 className="text-sm text-gray-400">Chat with your guide</h1>
                            </div>
                        </div>
                    </div>
                    {session?.user ? (
                        <>
                            <ChatMessages userId={session?.user.id} bidId={params.bid_id} />
                            <ChatInput user={data} bidId={params.bid_id} />
                        </>
                    ) : <h1>You have to accept bids first to enable chat</h1>}
                </div>
            </div >
        </>
    );
}