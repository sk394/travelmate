"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Button } from "../ui/button";
import { acceptBid } from "@/app/actions/bid-actions";
import { useRouter } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";

export default function BidPost({ tripId }: { tripId: string }) {
    const [bids, setBids] = useState<BidWithProfile[]>([]);
    const supabase = createClientComponentClient<Database>();
    const router = useRouter();

    const fetchBids = useCallback(async () => {
        const { data, error } = await supabase.from('bids').select(
            `*, 
           guide:guides!bids_guide_id_fkey (
               full_name,
               photo_urls    
           )
           `
        ).eq('trip_id', tripId).order('amount', { ascending: false });
        if (error) {
            console.log("error", error);
        } else {
            setBids(data as BidWithProfile[]);
        }
    }, [supabase, tripId]);

    useEffect(() => {
        fetchBids();

        const channel = supabase.channel(`bids:trip_id=eq.${tripId}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'bids',
                    filter: `trip_id=eq.${tripId}`
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                async (payload: any) => {
                    // Fetch the updated bid with guide information
                    const bidId = payload.new?.id || payload.old?.id;
                    if (!bidId) {
                        console.error("No bid ID found in payload:", payload);
                        return;
                    }
                    const { data: updatedBid, error } = await supabase
                        .from('bids')
                        .select(`
                    *,
                    guide:guides!bids_guide_id_fkey (
                        full_name,
                        photo_urls
                    )
                `)
                        .eq('id', bidId)
                        .single();

                    if (error) {
                        console.error("Error fetching updated bid:", error);
                        return;
                    }

                    if (payload.eventType === 'INSERT') {
                        setBids((prevBids) => [updatedBid as BidWithProfile, ...prevBids]);
                    } else if (payload.eventType === 'UPDATE') {
                        setBids((prevBids) =>
                            prevBids.map((bid) =>
                                bid.id === updatedBid.id ? (updatedBid as BidWithProfile) : bid
                            )
                        );
                    } else if (payload.eventType === 'DELETE' && payload.old) {
                        setBids((prevBids) =>
                            prevBids.filter((bid) => bid.id !== payload.old?.id)
                        );
                    }
                }
            )
            .subscribe()

        return () => {
            channel.unsubscribe();
        }
    }, [fetchBids, supabase, tripId])

    return (
        <>
            {
                bids.map((bid) => (
                    <div
                        key={bid.id}
                        className="flex items-start gap-4 p-4 rounded-lg bg-muted/40"
                    >
                        <Link href={`/guide/profile/${bid.guide_id}`} title="View Guide Profile">
                            <Avatar>
                                <AvatarImage src={""} alt="Guide Name" />
                                <AvatarFallback>{bid.guide.full_name.split(" ").map((n) => n[0]).join(".")}</AvatarFallback>
                            </Avatar>
                        </Link>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold">{bid.guide.full_name}</h4>
                                <p className="text-sm text-muted-foreground">
                                    {bid.created_at ? formatDistanceToNow(new Date(bid.created_at), { addSuffix: true }) : "Unknown time"}
                                </p>
                            </div>
                            <p className="mt-1 text-sm">{bid.itinerary}</p>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" className="w-full mt-4 rounded"
                                            onClick={
                                                async () => {
                                                    if (bid.status === 'pending') {
                                                        await acceptBid(bid.id)
                                                    } else if (bid.status === 'accepted') {
                                                        router.push(`/traveler/messages/${bid.id}?trip_id=${tripId}`)
                                                    } else {
                                                        console.log("Bid Rejected")
                                                    }
                                                }}
                                        >
                                            <span className="font-semibold text-primary">
                                                {bid.status === 'pending' ? 'Accept' :
                                                    bid.status === 'accepted' ? 'Accepted' :
                                                        bid.status === 'rejected' ? 'Rejected' : null}  ${bid.amount.toLocaleString()}
                                            </span>
                                        </Button>
                                    </TooltipTrigger>
                                    {bid.status === 'accepted' && <TooltipContent>
                                        <p className="text-sm ">
                                            You have accepted this bid. Click to chat with the guide.
                                        </p>
                                    </TooltipContent>
                                    }
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>))
            }
        </>
    )
}