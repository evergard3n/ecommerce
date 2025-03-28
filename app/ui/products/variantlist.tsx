import { getPhoneVariations } from "@/app/lib/data";
import { Phone } from "@/app/lib/definitions";
import Variant from "./variant";

export default async function VariantList({
  product_id,
}: {
  product_id: string;
}) {
  const allVariants: Phone[] = await getPhoneVariations(product_id);
  if(!allVariants){
    return null
  } else {
    return (
        <div className="w-full">
          <p className="text-xl font-semibold mt-6">
            Variants. <span className="text-zinc-400">Which is best for you?</span>
          </p>
          <ol className="grid grid-cols-2 gap-4 w-full mt-4">
            {allVariants.map((item, index) => (
              <li key={index}>
                <Variant product={item} />
              </li>
            ))}
          </ol>
        </div>
      );
  }
  
}
