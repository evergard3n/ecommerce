import { getProductById } from "@/app/lib/data";
import { Product } from "@/app/lib/definitions";
import { notFound } from "next/navigation";
import ProductDetails from "@/app/ui/products/productDetails";
import VariantList from "@/app/ui/products/variantlist";
import { Metadata } from "next";
import ImageGallery from "@/app/ui/products/imageGallery";
import Markdown from "react-markdown";
import { CpuChipIcon, DevicePhoneMobileIcon, BoltIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id, "phone") || await getProductById(id, "laptop");

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
  const { id } = await params;

  // Try to fetch as phone first
  product = await getProductById(id, "phone");

  // If not found as phone, try as laptop
  if (!product) {
    product = await getProductById(id, "laptop");
    type = "laptop";
  }

  if (!product) {
    notFound();
  }
  const imageUrls: string = product.image
  const test = imageUrls.split("\n").filter((imageUrl) => imageUrl !== "");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-7xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">{product.name}</h1>

        <div className="flex flex-col gap-8">
          <div className="w-full">
            <ImageGallery imageUrls={test} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <BoltIcon className="w-6 h-6 text-black" />
                <h2 className="text-xl font-semibold">Price</h2>
              </div>
              <p className="text-3xl font-bold text-black">
                {product.price}
              </p>

            </div>
            {type === "phone" && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <DevicePhoneMobileIcon className="w-6 h-6 " />
                  <h2 className="text-xl font-semibold">Variants</h2>
                </div>
                <VariantList product_id={product.product_id} />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <CpuChipIcon className="w-6 h-6 " />
                <h2 className="text-xl font-semibold">Technical Details</h2>
              </div>
              <ProductDetails product_id={product.product_id} type={type} />
            </div>





            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <ComputerDesktopIcon className="w-6 h-6 " />
                <h2 className="text-xl font-semibold">Description</h2>
              </div>
              <div className="prose max-w-none">
                <Markdown>{product.description}</Markdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
