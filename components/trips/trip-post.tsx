'use client'

import * as React from "react"
import { formatDistanceToNow } from "date-fns"
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { deleteTrip, updateTrip } from "@/app/actions/trip-action"
import BidPost from "../bids/post-bids"
import { getStepCount } from "@/app/utils/stepper"
import { cn } from "@/lib/utils"

export default function TripPost({
    posts
}: {
    posts: TripWithProfile[]
}) {
    const [isEditingId, setIsEditingId] = React.useState<string>()
    const [description, setDescription] = React.useState<string>("")

    const { toast } = useToast();

    const handleEdit = (post: TripWithProfile) => {
        setIsEditingId(post.id);
        setDescription(post.description ?? "");
    }

    // Generate dots based on step count
    const renderDots = (post: Trip) => {
        const dots = [];

        for (let i = 0; i < 3; i++) {
            dots.push(
                <div
                    key={i}
                    className={`h-3 w-3 rounded-full ${i < getStepCount(post)
                        ? 'bg-orange-500 border-2 border-white'
                        : 'bg-white/50'
                        }`}
                />
            );
        }
        return dots;
    };

    return (
        <>
            {posts.map((post) => (
                <div key={post.id} className="rounded-lg  w-1/2 bg-white dark:bg-slate-800 ring-1 ring-slate-900/5 shadow-xl">
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={post.profiles.travelers.photo_url ?? '/default-avatar.png'} alt="user photo" />
                                <AvatarFallback>{post.profiles.travelers.full_name}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-semibold">{post.profiles.travelers.full_name}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {post.created_at ? formatDistanceToNow(new Date(post.created_at), { addSuffix: true }) : "Unknown time"}
                                </p>
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-5 w-5" />
                                    <span className="sr-only">More options</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEdit(post)}>
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={async () => {
                                        await deleteTrip(post.id);
                                        toast({
                                            title: "Post deleted",
                                            description: "Your post has been successfully deleted.",
                                        })
                                    }}
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Content */}
                    <div className="px-4 pb-4">
                        {isEditingId === post.id ? (
                            <div className="space-y-2">
                                <Textarea
                                    value={description ?? ""}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="min-h-[100px]"
                                />
                                <div className="flex gap-2 justify-end">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setIsEditingId(undefined);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button size="sm" onClick={async () => {
                                        await updateTrip(post.id, description);
                                        setIsEditingId(undefined);
                                    }}>
                                        Save
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <p className="text-slate-500 dark:text-slate-400 mt-2 text-md">{post.description}</p>
                        )}
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
                            <div className="flex items-center justify-between">
                                {/* Destination on left */}
                                <h2 className="text-white text-xl font-semibold w-1/4 truncate text-ellipsis" title={post.destination}>
                                    {post.destination}
                                </h2>

                                {/* Stepper line with dots/circles connecting destination to status */}
                                <div className="flex items-center mx-4 flex-1">
                                    <div className="h-1 bg-white/30 flex-1 relative">
                                        <div
                                            className="absolute top-0 left-0 h-1 bg-orange-500"
                                            style={{ width: `${(getStepCount(post) / 3) * 100}%` }}
                                        ></div>

                                        {/* Status dots */}
                                        <div className="absolute inset-0 flex justify-between items-center">
                                            {renderDots(post.status)}
                                        </div>
                                    </div>
                                </div>

                                {/* Status on right */}
                                <h2 className={cn("text-xl font-semibold capitalize", post.status === 'canceled' ? 'text-destructive' : post.status === 'completed' ? 'text-green-200' : 'text-white')}>
                                    {post?.status}
                                </h2>
                            </div>
                        </div>
                    </div >

                    {/* Footer */}
                    < div className="p-4 border-t" >
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button className="w-full">
                                    View Bids
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="w-[400px] overflow-y-scroll">
                                <SheetHeader>
                                    <SheetTitle>Bids</SheetTitle>
                                </SheetHeader>
                                <div className="mt-6 space-y-4 ">
                                    <BidPost tripId={post.id} />
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

