"use client";
import { useMessage } from "@/hooks/use-Message";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { Input } from "../ui/input";
import { v4 as uuidv4 } from "uuid";
import { SendIcon } from "lucide-react";


export default function ChatInput({ user, bidId }: { user: Traveler | Guides; bidId?: string }) {

    const addMessage = useMessage((state) => state.addMessage);
    const setOptimisticIds = useMessage((state) => state.setOptimisticIds);
    const supabase = createClientComponentClient<Database>();

    const handleSendMessage = async (text: string) => {
        if (text.trim()) {
            const newMessage = {
                id: uuidv4(),
                content: text,
                sender_id: user?.id,
                user: {
                    role: user?.role,
                    email: user?.email,
                },
            };
            addMessage(newMessage as MessageWithProfile);
            setOptimisticIds(newMessage.id);
            const { error } = await supabase
                .from("messages")
                .insert({
                    id: newMessage.id,
                    bid_id: bidId,
                    sender_id: newMessage.sender_id,
                    content: newMessage.content
                });
            if (error) {
                alert("Failed to send message!!");
            }
        } else {
            alert("Message can not be empty!!");
        }
    };

    return (
        <div className="p-5">
            <Input
                placeholder="Send Message"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSendMessage(e.currentTarget.value);
                        e.currentTarget.value = "";
                    }
                }}
                endIcon={SendIcon}
            />
        </div>
    );
}