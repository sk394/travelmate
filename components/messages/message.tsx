
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Message({ message, isCurrentUser }: { message: MessageWithProfile; isCurrentUser: boolean }) {

    return (
        <div
            className={cn(
                "flex gap-2 mb-4",
                isCurrentUser ? "flex-row-reverse" : "flex-row"
            )}
        >
            <div className="flex-shrink-0">
                <Link
                    href={message.user.role === "traveler" ? `/traveler/profile/${message.sender_id}` : `/guide/profile/${message.sender_id}`}
                >
                    <Image
                        src={message.user.avatar_url ?? "/avatar.png"}
                        alt={message.user.full_name}
                        width={40}
                        height={40}
                        className="rounded-full ring-2 ring-primary/20"
                    />
                </Link>
            </div>
            <div
                className={cn(
                    "flex flex-col max-w-[80%]",
                    isCurrentUser ? "items-end" : "items-start"
                )}
            >
                <div
                    className={cn(
                        "flex items-center gap-2",
                        isCurrentUser ? "flex-row-reverse" : "flex-row"
                    )}
                >
                    <h1 className="font-bold text-sm">{isCurrentUser ? "You" : message.user.full_name}</h1>
                    <h1 className="text-xs text-muted-foreground">
                        {message.created_at ? new Date(message.created_at).toDateString() : ""}
                    </h1>
                </div>
                <div
                    className={cn(
                        "mt-1 px-4 py-2 rounded-lg",
                        isCurrentUser
                            ? "bg-primary text-primary-foreground rounded-tr-none"
                            : "bg-muted rounded-tl-none"
                    )}
                >
                    <p className="text-sm">{message.content}</p>
                </div>
            </div>
        </div>
    );
}
