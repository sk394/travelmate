'use client'

import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import CreateBid from "./create-bid"
import { formatDistanceToNow } from "date-fns"


export default function TravellerPosts({
    posts,
    guide_id
}: {
    posts: TripWithProfile[];
    guide_id: string;
}) {

    return (
        <>
            {posts.map((post) => (
                <div key={post.id} className="rounded-lg overflow-hidden w-1/2 bg-white dark:bg-slate-800 ring-1 ring-slate-900/5 shadow-xl">
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={'/avatar.png'} alt="user photo" />
                            </Avatar>
                            <div>
                                <h3 className="font-semibold">Anonymous</h3>
                                <p className="text-sm text-muted-foreground">
                                    {post.created_at ? formatDistanceToNow(new Date(post.created_at), { addSuffix: true }) : "Unknown time"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-4 pb-4">
                        <p className="text-slate-500 dark:text-slate-400 mt-2 text-md">{post.description}</p>
                    </div>

                    {/* Image */}
                    < div className="relative h-72 w-full" >
                        <Image
                            src="/location.jpg"
                            alt={post.destination}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={true}
                            className="object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <h2 className="text-white text-xl font-semibold">
                                {post.destination}
                            </h2>
                        </div>
                    </div >

                    {/* Footer */}
                    < div className="p-4 border-t" >
                        <Sheet>
                            <SheetTrigger asChild>
                                {post?.status === 'posted' ? <Button className="w-full">
                                    Place Bid
                                </Button> : post?.status === 'pending' ? <Button className="w-full" variant="secondary">
                                    Bid Accepted
                                </Button> : <Button className="w-full">Bid Rejected </Button>}
                            </SheetTrigger>
                            <SheetContent className="w-[400px]">
                                <SheetHeader>
                                    <SheetTitle>Bids</SheetTitle>
                                </SheetHeader>
                                <div className="mt-6 space-y-4">
                                    <CreateBid tripId={post.id} guideId={guide_id} bidInfo={post.bids[0]} />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div >
                </div >
            ))
            }
        </>
    )
}

