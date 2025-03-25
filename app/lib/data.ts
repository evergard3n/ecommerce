import { Product } from "./definitions";
import { products } from "./placeholder";

export async function getProductById(id: string) {
  try {
    // const res = await fetch('/placeholder.json') ;
    // const res_json = await res.json()

    const res = await products.find((p) => p.id === id);
    if(!res) {
        throw new Error(`Product with id ${id} not found`)
    }
    const product: Product = res;
    return product;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch post.");
  }
}
