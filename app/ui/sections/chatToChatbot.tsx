import { ArrowUpIcon } from "@heroicons/react/24/outline";
import TextTransition from "../components/textAnimation";
import ChatToChatbotForm from "./chatToChatbotForm";
export default function ChatToChatbot() {
  return (
    <section className="h-fit py-8 flex flex-col items-center gap-4 bg-zinc-900 rounded-md">
      <h1 className={`text-zinc-100 text-3xl font-bold`}>Haven't found what you're looking for?</h1>
      <h2 className="text-white">Chat with the most innovative consulting chatbot, <span className="italic">ever</span>.</h2>
      <div className=" w-full ">
      <TextTransition/>
      </div>
      <div className="w-1/3">
        <ChatToChatbotForm />
      </div>
    </section>
  );
}
