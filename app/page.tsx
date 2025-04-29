import Image from "next/image";
import NavBar from "./ui/components/navbar";
import Recommended from "./ui/sections/recommended";
import ChatToChatbot from "./ui/sections/chatToChatbot";
import ProductsByBrands from "./ui/sections/productsByBrands";
export default function Home() {
  return (
    <div>
      <Recommended/>
      <ChatToChatbot/>
      <ProductsByBrands/>
    </div>
  );
}
