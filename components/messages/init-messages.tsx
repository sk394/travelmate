"use client";

import React, { useEffect, useRef } from "react";
import { useMessage } from "@/hooks/use-Message";

export default function InitMessages({ messages }: { messages: Message[] }) {
    const initState = useRef(false);
    const hasMore = messages.length >= 100;

    useEffect(() => {
        if (!initState.current) {
            useMessage.setState({ messages, hasMore });
        }
        initState.current = true;
        // eslint-disable-next-line
    }, []);

    return <></>;
}