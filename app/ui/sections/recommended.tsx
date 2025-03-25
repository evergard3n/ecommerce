import { poppins, geistSans } from "@/app/layout";
import { type SingleItemProps } from "../components/singleItem";
import SingleItem from "../components/singleItem";
import Featured from "../components/featured";
import { getProductById, getRecommendedProduct } from "@/app/lib/data"
import { auth } from "@clerk/nextjs/server";
import { Product } from "@/app/lib/definitions";
export default async function Recommended() {
  const {userId} = await auth();
  const recommendedProducts: Product[] = await getRecommendedProduct(userId? userId : "");
  return (
    <section className="h-fit py-8 flex flex-col items-center gap-8">
      <Featured/>
      <h1 className={`text-black text-3xl font-bold`}>Featured Products. <span className="text-zinc-600">Picked just for you.</span></h1>
      <div className="grid grid-cols-4 gap-4 w-full">
        {recommendedProducts.map((item, index) => (
          <SingleItem key={index} {...item} />
        ))}
      </div>
    </section>
  );
}
