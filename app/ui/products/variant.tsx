import { Product } from "@/app/lib/definitions";
import Link from "next/link";

export default function Variant({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="w-full h-18 px-4 py-2 border rounded-lg border-zinc-400">
        <h1>{product.name}</h1>
        <p>{product.price}</p>
      </div>
    </Link>
  );
}
