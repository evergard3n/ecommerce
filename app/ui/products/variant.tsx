'use client'
import { Product } from "@/app/lib/definitions";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Variant({ product }: { product: Product }) {
  const encodedProductId = encodeURIComponent(product.product_id);
  const pathname = usePathname()
  const current = pathname === `/products/${encodedProductId}`
  return (
    <Link href={`/products/${encodedProductId}`}>
      <div className={`w-full min-h-18 h-fit px-4 py-2 flex flex-col items-start justify-center border rounded-lg ${pathname === `/products/${encodedProductId}` ? "bg-zinc-700 font-semibold text-white border-none" : "border-zinc-200"}`}>
        <h1>{product.name}</h1>
        <p>{product.storage}</p>
      </div>
    </Link>
  );
}
