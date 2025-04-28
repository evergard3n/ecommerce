'use client'

import { ArrowUpIcon } from "@heroicons/react/16/solid"
import { useChatbotContext } from "@/app/lib/chatbotContext"
import { useWebSocket } from "@/app/lib/wsContext";
import { useState } from "react";

export default function ChatToChatbotForm() {
    const chatContext = useChatbotContext();
    const wsContext = useWebSocket();
    const [message, setMessages] = useState<string>('');
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (chatContext) {
            wsContext?.sendMessage(message);
            chatContext.setIsOpen(true);
            setMessages('');
        }
    }
    return (
        <form onSubmit={handleSubmit} className="bg-zinc-50 h-12 rounded-full w-full flex flex-row items-center px-1">
            <input type="text" className="flex-grow focus:outline-none px-3" placeholder="Ask anything" value={message} onChange={(e) => setMessages(e.target.value)}/>
            <button type="submit" className={`h-10 w-10 ${message ? 'bg-zinc-900' : 'bg-zinc-200'} rounded-full flex items-center justify-center text-zinc-50`}>
                <ArrowUpIcon className="size-5"/>
            </button>
        </form>
    )
}