import { getProductById, getRecommendedProduct } from "@/app/lib/data";
import { Product } from "@/app/lib/definitions";
import ImageGallery from "@/app/ui/products/imageGallery";
import ProductDetails from "@/app/ui/products/productDetails";
import Variant from "@/app/ui/products/variant";
import VariantList from "@/app/ui/products/variantlist";
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
  const imageUrls : string = product.image
  const test = imageUrls.split("\n").filter((imageUrl) => imageUrl !== "");
  // TODO: change this to actual recommendations
  const {userId} = await auth();
  const productList: Product[] = await getRecommendedProduct(userId ? userId : "");
  return (
    <div className="flex flex-row gap-8 mt-8">
      
      <ImageGallery imageUrls={test}/>
      <div className="w-1/3 flex flex-col items-start gap-4">
        <h1 className="text-5xl font-bold ">{product.name} {product.storage}</h1>
        <div className=" text-2xl   rounded-lg flex items-center justify-center">
          <h1>From {product.price}</h1>
          <p>{test.length}</p>
        </div>
        <VariantList product_id={id} />
        <h1 className="text-xl font-semibold mt-6">Notable Details.</h1>
        <ProductDetails product_id={id}/>
      </div>
    </div>
  );
}
