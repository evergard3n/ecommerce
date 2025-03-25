import { Product, TechnicalDetails } from "./definitions";
import { products, technical_details } from "./placeholder";

export async function getProductById(id: string) {
  try {
    // const res = await fetch('/placeholder.json') ;
    // const res_json = await res.json()

    const res = await products.find((p) => p.id === id);
    if (!res) {
      throw new Error(`Product with id ${id} not found`);
    }
    const product: Product = res;
    return product;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to fetch product with id ${id}`);
  }
}
export async function getRecommendedProduct(userId: string) {
  try {
    // const res = await fetch('/placeholder.json') ;
    // const res_json = await res.json()

    // TODO: search recommended products by userId
    const res = products;
    if (!res) {
      throw new Error(`Failed fetching recommended`);
    }
    const product: Product[] = res.slice(0, 4);
    return product;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch recommended");
  }
}
export async function getProductTechnicalDetails(id: string) {
  try {
    // const res = await fetch('/placeholder.json') ;
    // const res_json = await res.json()

    const res = await technical_details.find((p) => p.product_id === id);
    if (!res) {
      throw new Error(`Product with id ${id} not found`);
    }
    const response: TechnicalDetails = res;
    return response;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to fetch product with id ${id}`);
  }
  
}
