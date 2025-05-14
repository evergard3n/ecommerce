'use client'
import { Chat } from "@/app/lib/definitions";
import { useEffect, useRef } from "react";
import Markdown from "react-markdown";
import { useWebSocket } from "@/app/lib/wsContext";
import { SyncLoader } from "react-spinners";
import Link from "next/link";
import { formatPhoneName } from "@/app/lib/data";
function UserBubble({ chat }: { chat: Chat }) {
    return (
        <div className="h-fit bg-zinc-200 py-2 px-4 rounded-full text-black ">
            <p className="text-right">{chat.message}</p>
        </div>
    )
}
function BotBubble({ chat }: { chat: Chat }) {
    return (
        <div className="h-fit min-w-full w-ful text-left">
            <Markdown>{chat.message}</Markdown>
        </div>
    )
}
function MentionedBubble() {
    const mentioned = useWebSocket()?.mentioned || [];
    
    if(mentioned.length > 0) {
        return (
            <div className="h-fit min-w-full  text-left border border-zinc-200 rounded-md p-2">
                <p className="text-sm text-zinc-500">Mentioned products:</p>
                <ol className="flex flex-wrap gap-2 mt-2">
                        {mentioned.map((mention) => {
                            const encodedMention = encodeURIComponent(mention);
                            return (
                                <li key={mention} className="bg-zinc-200 px-2 py-1 rounded-md hover:bg-zinc-300">
                                    <Link href={`/products/${encodedMention}`}>{formatPhoneName(mention)}</Link>
                                </li>
                            )
                        })}
                    </ol>
            </div>
        )
    } else {
        return null
    }
}
export default function ChatBubbles() {

    const olRef = useRef<HTMLOListElement>(null)
    useEffect(() => {
        const olElement = olRef.current;
        if (olElement) {
            olElement.scrollTo(0, olElement.scrollHeight);
        }
    });

    const message = useWebSocket()?.messages || [];
    const data = message || [];
    return (
        <div className="grow w-full">
            <ol className="max-h-[420px] h-fit w-full flex flex-col items-start px-4 py-2 gap-4 overflow-y-auto" ref={olRef}>
                {data.map((chat, index) => {
                    if (chat.sender.trim() === "You" || chat.sender.trim() === "User") {
                        return (

                            <li key={index} className="self-end"><UserBubble chat={chat} /></li>
                        )
                    } else {
                        return (
                            <li key={index}><BotBubble chat={chat} /><MentionedBubble /></li>
                        )
                    }
                })}
                <SyncLoader size={3} color="#000" loading={message.length > 0 && message[message.length - 1].sender === "User"} speedMultiplier={0.5} />
            </ol>
        </div>
    )
}