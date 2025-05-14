"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Chat } from "./definitions";
import { useUser } from "@clerk/nextjs";
import { convertToChatHistory } from "./data";
/* eslint-disable @typescript-eslint/no-explicit-any */

interface WebSocketContextType {
  socket: WebSocket | null;
  messages: Chat[] | undefined;
  sendMessage: (message: string) => void;
  sendFormData: (formData: any) => void;
  formContent: any;
  status: "loading" | "connected" | "disconnected";
  mentioned: string[];
  chatIphone: boolean;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Chat[]>([]);
  const [formContent, setFormContent] = useState();
  const [status, setStatus] = useState<"loading" | "connected" | "disconnected">("disconnected");
  const [mentioned, setMentioned] = useState<string[]>([]);
  const [chatIphone, setChatIphone] = useState<boolean>(false);
  const { user } = useUser();
  // useEffect(() => {
  //   if(!user) return;
  //   const getMessages = async () => {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_CHATBOT_URL}/api/history/${user.id}`);
  //     if(!response) return;
  //     console.log(response);
  //     const data = await response.json();
  //     if(!data.chat_history) return;
  //     setMessages(data.chat_history);

  //   }
  //   getMessages();
  // },[user])
  useEffect(() => {
    // const ws = new WebSocket(`wss://${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat`);
    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_CHATBOT_URL}`);
    ws.onopen = () => {
      setStatus("connected");
      console.log("🟢 WebSocket đã kết nối!");
    };
    ws.onclose = () => {
      setStatus("disconnected");
      console.log(
        `🔴 WebSocket mất kết nối! ${process.env.NEXT_PUBLIC_CHATBOT_URL}`
      );
    };
    ws.onerror = (error) => console.error("⚠️ WebSocket error:", error);

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.reply && response.reply !== "Cập nhật form thành công.") {
        const newMessage: Chat = {
          message: response.reply,
          sender: "BOT",
        };
        console.log(response);
        setMessages((prev) => [...prev, newMessage]);
        setFormContent(response.form);
      } else {
        setMessages(convertToChatHistory(response.chat_history));
        setMentioned(response.mentioned_products);
        setChatIphone(true);
      }
    };

    setSocket(ws);

    return () => {
      ws.close(); // Đóng kết nối khi unmount
    };
  }, []);
  function sendMessage(message: string) {
    const chatMessage: Chat = {
      sender: "User",
      message: message,
    };
    setMessages((prev) => [...prev, chatMessage]);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        message
      );
      console.log(chatMessage);
      
    } else {
      console.warn("⚠️ WebSocket chưa sẵn sàng!");
    }
  }
  function sendFormData(formData: any) {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "formUpdate", data: formData }));
    }
  }
  return (
    <WebSocketContext.Provider
      value={{ socket, messages, sendMessage, sendFormData, formContent, status, mentioned, chatIphone }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
