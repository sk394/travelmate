"use client";

import { useEffect, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { bidSchema } from "@/lib/schema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { createBid } from "@/app/actions/bid-actions";
import Link from "next/link";
import { cn } from "@/lib/utils";


export default function CreateBid({ tripId, guideId, bidInfo }: { tripId: string; guideId: string; bidInfo: Bid; }) {
    const supabase = createClientComponentClient<Database>();
    const [maxBid, setMaxBid] = useState<number>(0);
    const router = useRouter();
    const form = useForm<z.infer<typeof bidSchema>>({
        resolver: zodResolver(bidSchema),
        defaultValues: {
            amount: bidInfo?.amount ?? 0,
            itinerary: bidInfo?.itinerary ?? '',
            trip_id: tripId,
            guide_id: guideId
        }
    });

    const highestBid = async (tripId: string) => {
        const { data, error } = await supabase.rpc('get_highest_bid', { trip_id_param: tripId });
        if (error) {
            console.error(error);
            return;
        }
        setMaxBid(data);
    }

    useEffect(() => {
        highestBid(tripId);
        const realtimeBid = supabase.channel('realtime:bids')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'bids' }, async (payload) => {
                highestBid(tripId);
                return payload?.new ? router.refresh() : null;
            })
            .subscribe();
        return () => {
            realtimeBid.unsubscribe();
        }
    }, [supabase, tripId, highestBid, router]);

    async function onSubmit(data: z.infer<typeof bidSchema>) {
        await createBid({
            ...data,
            trip_id: tripId,
            guide_id: guideId
        });
    }

    if (bidInfo?.status === 'accepted') {
        return (
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent animate-shine inline-block px-6 py-3 rounded-lg shadow-lg">
                    Congratulations!
                </h1>
                <p>Your bid has been accepted.</p>
                <Link
                    className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mt-2")}
                    href={`/guide/messages/${bidInfo?.id ?? null}`}>Chat with the traveler</Link>
            </div >);
    }

    if (bidInfo?.status === 'rejected') {
        return <div>
            Your bid has been rejected. Try bidding to another trip.
        </div>
    }


    return (
        <>
            <p className="mt-4 font-semibold">Current Highest Bid: ${maxBid ?? 0}</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Your bid amount($)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter your bid"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="itinerary"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>What can you provide?</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Itineraries, activities, etc."
                                        className="min-h-24"
                                        rows={10}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    You can provide a detailed itinerary of the trip.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">{bidInfo ? "Update your bid" : "Submit your bid"}</Button>
                </form>
            </Form>
        </>
    )
};