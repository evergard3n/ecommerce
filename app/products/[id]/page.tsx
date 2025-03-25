import { getProductById } from "@/app/lib/data";
import { Product } from "@/app/lib/definitions";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const product: Product = await getProductById(id);
  return (
    <div>
      <h1>{product.name}</h1>
    </div>
  );
}
