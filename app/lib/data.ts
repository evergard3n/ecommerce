import { Product, PhoneTechnicalDetails, ProductCoverOnly } from "./definitions";
import { products, technical_details } from "./placeholder";

const backend_url = 'http://localhost:3000'

export async function getProductById(id: string) {
  
  try {
    // const res = await fetch('/placeholder.json') ;
    // const res_json = await res.json()
    const response = await fetch(
      `${backend_url}/api/products/phone/${id}`
    );
    const res = await response.json();
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
    const response = await fetch(
      `${backend_url}/api/products/recommended/${userId}`
    );
    if (!response.ok) {
      throw new Error("Cant fetch recommended");
    }
    const res = await response.json();
    // const res = products;
    // if (!res) {
    //   throw new Error(`Failed fetching recommended`);
    // }
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

    const response = await fetch(
      `${backend_url}/api/products/phone/${id}/technical`
    );
    const res = await response.json();
    if (!res) {
      throw new Error(`Product with id ${id} not found`);
    }

    return res;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to fetch product with id ${id}`);
  }
}

export async function getPhoneVariations(id: string) {
  try {
    // const res = await fetch('/placeholder.json') ;
    // const res_json = await res.json()

    const response = await fetch(
      `${backend_url}/api/products/variations/${id}`
    );
    if (!response.ok) {
      throw new Error("Cant fetch variations");
    }
    const res = await response.json();

    const product: Product[] = res.slice(0, 4);
    return product;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch variations");
  }
}
export async function getPhoneCover(id: string) {
  const encoded = encodeURIComponent(id);
  try {
    const response = await fetch(
      `${backend_url}/api/products/phone/${encoded}/cover`
    );
    if (!response.ok) {
      
      throw new Error("Cant fetch cover");
    }
    
    const res = await response.json();
    console.log(encoded)
    console.log(res)
    const selected: ProductCoverOnly = {
      product_id: res.product_id,
      cover_image: res.cover_image,
      type: 'phone'
    };
    return selected;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch cover");
  }
}
