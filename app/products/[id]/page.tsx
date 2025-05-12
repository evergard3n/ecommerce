import { getProductById } from "@/app/lib/data";
import { Product } from "@/app/lib/definitions";
import { notFound } from "next/navigation";
import ProductDetails from "@/app/ui/products/productDetails";
import VariantList from "@/app/ui/products/variantlist";
import { Metadata } from "next";
import ImageGallery from "@/app/ui/products/imageGallery";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = await getProductById(params.id, "phone") || await getProductById(params.id, "laptop");
  
  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  let product: Product | null = null;
  let type: "phone" | "laptop" = "phone";

  // Try to fetch as phone first
  product = await getProductById(params.id, "phone");
  
  // If not found as phone, try as laptop
  if (!product) {
    product = await getProductById(params.id, "laptop");
    type = "laptop";
  }

  if (!product) {
    notFound();
  }
  const imageUrls : string = product.image
  const test = imageUrls.split("\n").filter((imageUrl) => imageUrl !== "");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">{product.name}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {/* <img
              src={test[0]}
              alt={product.name}
              className="w-full h-auto rounded-lg"
            /> */}
            <ImageGallery imageUrls={test} />
          </div>
          
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Technical Details</h2>
              <ProductDetails product_id={product.product_id} type={type} />
            </div>

            {type === "phone" && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Variants</h2>
                <VariantList product_id={product.product_id} />
              </div>
            )}

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Price</h2>
              <p className="text-3xl font-bold text-blue-600">
                {product.price}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
