import Image from "next/image";
import NavBar from "./ui/components/navbar";
import Recommended from "./ui/sections/recommended";
import ChatToChatbot from "./ui/sections/chatToChatbot";
export default function Home() {
  return (
    <div>
      <Recommended/>
      <ChatToChatbot/>
    </div>
  );
}
