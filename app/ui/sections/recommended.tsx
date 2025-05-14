'use client'
import SingleItem from "../products/singleItem";
import Featured from "../components/featured";
import { getRecommendedProduct } from "@/app/lib/data"
import { auth } from "@clerk/nextjs/server";
import { Product } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import { useWebSocket } from "@/app/lib/wsContext";
export default function Recommended() {
  const chatIphone = useWebSocket()?.chatIphone;
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  useEffect(()=>{
    const fetchRecommendedProducts = async () => {
      const products = await getRecommendedProduct("", chatIphone);
      setRecommendedProducts(products);
    };
    fetchRecommendedProducts();
  }, [chatIphone]);
  return (
    <section className="h-fit py-8 flex flex-col items-center gap-8">
      <Featured/>
      <h1 className={`text-black text-3xl font-bold`}>Featured Products. <span className="text-zinc-600">Picked just for you.</span></h1>
      <div className="grid grid-cols-4 gap-4 w-full">
        {recommendedProducts.map((item, index) => (
          <SingleItem key={index} props={item} type="phone" />
        ))}
      </div>
    </section>
  );
}
