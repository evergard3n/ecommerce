"use client";
import {
  ChatBubbleBottomCenterIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import ChatBox from "./chatbox";
import ChatBubbles from "./chatbubble";
import { useState } from "react";
import { useChatbotContext } from "@/app/lib/chatbotContext";

export default function Chatbot() {
  const chatbotContext = useChatbotContext();
  const { isOpen, setIsOpen } = chatbotContext || {};
  //   const [open, setOpen] = useState<boolean>(true);
  function handleClick() {
    if (setIsOpen) {
        setIsOpen(!isOpen);
    }       
    
  }
  if (isOpen) {
    return (
      <div className="bg-white min-h-[500px] rounded-lg w-96 flex flex-col items-center overflow-hidden fixed bottom-4 right-8  drop-shadow-sm z-50">
        <div className="h-12 bg-white border-b border-zinc-100 flex flex-row justify-between px-4 items-center text-black text-md w-full font-semibold">
          <p>Chatbot</p>
          <button onClick={handleClick}>
            <PlusCircleIcon width={24} height={24} className="rotate-45" />
          </button>
        </div>
        <ChatBubbles />
        <ChatBox />
      </div>
    );
  } else {
    return (
      <div className="fixed bottom-4 right-8 drop-shadow-lg group">
        <button
          className="flex flex-row gap-1 items-center justify-center group-hover:bg-zinc-200 bg-white text-black border border-zinc-800 py-2 px-4 rounded-lg transition-colors duration-150 ease-in"
          onClick={handleClick}
        >
          <ChatBubbleBottomCenterIcon width={18} height={18} />
          <p>Chatbot</p>
        </button>
      </div>
    );
  }
}
