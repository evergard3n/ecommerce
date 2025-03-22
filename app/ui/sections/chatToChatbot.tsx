import { ArrowUpIcon } from "@heroicons/react/24/outline";
import TextTransition from "../components/textAnimation";
export default function ChatToChatbot() {
  return (
    <section className="h-fit py-8 flex flex-col items-center gap-4 bg-zinc-900 rounded-md">
      <h1 className={`text-zinc-100 text-3xl font-bold`}>Haven't found what you're looking for?</h1>
      <h2 className="text-white">Chat with the most innovative consulting chatbot, <span className="italic">ever</span>.</h2>
      <div className=" w-full ">
      <TextTransition/>
      </div>
      <div className="w-1/3">
        <form action="" className="bg-zinc-50 h-12 rounded-full w-full flex flex-row items-center px-1">
            <input type="text" className="flex-grow focus:outline-none px-3" placeholder="Ask anything"/>
            <button type="submit" className="h-10 w-10 bg-zinc-400 rounded-full flex items-center justify-center text-zinc-50">
                <ArrowUpIcon className="size-5"/>
            </button>
        </form>
      </div>
    </section>
  );
}
