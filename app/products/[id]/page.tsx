import { getProductById, getRecommendedProduct } from "@/app/lib/data";
import { Product } from "@/app/lib/definitions";
import ProductDetails from "@/app/ui/products/productDetails";
import Variant from "@/app/ui/products/variant";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const params = await props.params;
    const post = await getProductById(params.id);
  return {
    title: post.name
  };
}
import Image from "next/image";
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const product: Product = await getProductById(id);
  
  // TODO: change this to actual variants
  const {userId} = await auth();
  const productList: Product[] = await getRecommendedProduct(userId ? userId : "");
  return (
    <div className="flex flex-row gap-8 mt-8">
      
      <div className="w-2/3 h-160 flex-grow  bg-white flex items-center justify-center drop-shadow-md rounded-2xl border-8 border-zinc-50 overflow-clip">
        <Image
          alt={product.name}
          src={product.image}
          width={400}
          height={400}
        />
      </div>
      <div className="w-1/3 flex flex-col items-start gap-4">
        <h1 className="text-5xl font-bold ">{product.name}</h1>
        <div className=" text-2xl   rounded-lg flex items-center justify-center">
          <h1>From {product.price}</h1>
        </div>
        <p className="text-xl font-semibold mt-6">Variants. <span className="text-zinc-400">Which is best for you?</span></p>
        <ol className="grid grid-cols-2 gap-4 w-full">
          {productList.map((item, index) => (
            <li key={index}>
              <Variant product={item} />
            </li>
          ))}
        </ol>
        <h1 className="text-xl font-semibold mt-6">Notable Details.</h1>
        <ProductDetails product_id={id}/>
      </div>
    </div>
  );
}
