import { Product } from "@/app/lib/definitions";
import Image from "next/image";
import { Suspense } from "react";
import Link from "next/link";
export type SingleItemProps = {
  brand: string;
  name: string;
  price: string;
  image: string;
};
export default function SingleItem(props: Product) {
  const encodedProductId = encodeURIComponent(props.product_id);
  const urls: string[] = props.image.split('\\n').filter((url) => url !== "");
  return (
    <div className="lg:w-full lg:min-h-108 h-fit max-h-112 items-start border border-zinc-200 rounded-md overflow-hidden  hover:drop-shadow-lg hover:bg-gradient-to-b bg-white transition-all duration-200 ease-in-out">
      <Link href={`/products/${encodedProductId}`} className="p-4 flex flex-col justify-between items-center h-full">
        <div className="text-left w-full flex-grow h-32  ">
          <h2 className="text-zinc-700">{props.brand}</h2>
          <h3 className="font-bold text-2xl">{props.name} {props.storage}</h3>
          <p>{props.price}</p>
          
        </div>

        <div className="w-full h-fit  flex flex-col items-center justify-center bg-black">
          <Suspense fallback={<div className="bg-zinc-300 w-full h-full">Loading...</div>}>
            <Image
              alt={props.name}
              src={
                urls[0]
              }
              width={400}
              height={400}
              className="overflow-hidden"
            />
          </Suspense>
        </div>
      </Link>
    </div>
  );
}
