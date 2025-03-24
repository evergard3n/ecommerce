import { poppins, geistSans } from "@/app/layout";
import { type SingleItemProps } from "../components/singleItem";
import SingleItem from "../components/singleItem";
import Featured from "../components/featured";
export default function Recommended() {
  return (
    <section className="h-fit py-8 flex flex-col items-center gap-8">
      <Featured/>
      <h1 className={`text-black text-3xl font-bold`}>Featured Products. <span className="text-zinc-600">Picked just for you.</span></h1>
      <div className="grid grid-cols-4 gap-4 w-full">
        <SingleItem
          brand="Apple"
          name="iPhone 14"
          price="$999"
          image="/images/iphone-14.jpg"
        />
        <SingleItem
          brand="Apple"
          name="iPhone 14"
          price="$999"
          image="/images/iphone-14.jpg"
        />
        <SingleItem
          brand="Apple"
          name="iPhone 14"
          price="$999"
          image="/images/iphone-14.jpg"
        />
        <SingleItem
          brand="Apple"
          name="iPhone 14"
          price="$999"
          image="/images/iphone-14.jpg"
        />
      </div>
    </section>
  );
}
