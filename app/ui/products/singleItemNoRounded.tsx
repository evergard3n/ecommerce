"use client";
import { Product, ProductCoverOnly } from "@/app/lib/definitions";
import Image from "next/image";
import { Suspense } from "react";
import Link from "next/link";
import { getPhoneCover } from "@/app/lib/data";
import { useState, useEffect } from "react";
export type SingleItemProps = {
  brand: string;
  name: string;
  price: string;
  image: string;
};
export default function SingleItem({props, type} : {props: Product, type: "phone" | "laptop" | "tablet"}) {
  const [productCoverImage, setProductCoverImage] = useState<ProductCoverOnly>(
    {} as ProductCoverOnly
  );
  useEffect(()=>{
    async function fetchProductCoverImage() {
      const productCoverImage = await getPhoneCover({id: props.url, type});
      setProductCoverImage(productCoverImage);
    }
    fetchProductCoverImage();
  },[props])
  const encodedProductId = encodeURIComponent(props.product_id);
  return (
      <div className="lg:w-full lg:min-h-108 h-fit max-h-112 items-start overflow-hidden  bg-zinc-100  transition-all duration-200 ease-in-out">
      <Link
        href={`/products/${encodedProductId}`}
        className="p-8 flex flex-col justify-between items-center h-full"
      >
        <div className="text-center w-full flex-grow h-32  ">
          <h3 className="font-semibold text-xl">
            {props.name} {props.storage}
          </h3>
        </div>

        <div className="w-full h-fit  flex flex-col items-center justify-center ">
          <Suspense
            fallback={
              <div className="bg-zinc-300 w-full h-full">Loading...</div>
            }
          >
            {
              productCoverImage.cover_image && (
                <Image
                  alt={props.name}
                  src={productCoverImage.cover_image}
                  width={180}
                  height={180}
                  className="overflow-hidden"
                />
              )
            }
          </Suspense>
        </div>
      </Link>
    </div>
  );
}
