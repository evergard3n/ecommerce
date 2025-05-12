import {
  Product,
  PhoneTechnicalDetails,
  ProductCoverOnly,
} from "./definitions";
import { products, technical_details } from "./placeholder";

const backend_url = "http://localhost:3000";

export async function getProductById(id: string, type: "phone" | "laptop") {
  try {
    const response = await fetch(`${backend_url}/api/products/${type}/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data) {
      return null;
    }

    const product: Product = {
      ...data,
      type
    };
    return product;
  } catch (error) {
    console.error("Database Error:", error);
    return null;
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
    console.log(product);
    return product;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch recommended");
  }
}
export async function getProductTechnicalDetails(product_id: string, type: "phone" | "laptop") {
  try {
    const response = await fetch(
      `${backend_url}/api/products/${type}/technical?productId=${product_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${backend_url}/api/products/${type}/technical?productId=${product_id}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching technical details:", error);
    throw error;
  }
}

export async function getPhoneVariations(id: string) {
  const encoded = encodeURIComponent(id);
  try {
    // const res = await fetch('/placeholder.json') ;
    // const res_json = await res.json()

    const response = await fetch(
      `${backend_url}/api/products/variations/${encoded}`
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
/**
 * Fetches the cover image for a phone product given its id.
 *
 * @param {string} id - id of the phone product
 * @returns {Promise<ProductCoverOnly>}
 * @throws {Error} if the request fails
 * @throws {Error} if the response is not ok
 */
export async function getPhoneCover({
  id,
  type,
}: {
  id: string;
  type: "phone" | "laptop" | "tablet";
}) {
  const encoded = encodeURIComponent(id);
  try {
    const response = await fetch(
      `${backend_url}/api/products/${type}/cover?url=${encoded}`
    );
    if (!response.ok) {
      throw new Error(`Cant fetch cover for ${type}, with id ${encoded}`);
    }

    const res = await response.json();
    const selected: ProductCoverOnly = {
      product_id: res.product_id,
      cover_image: res.cover_image,
      type: "phone",
    };
    return selected;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch cover");
  }
}

export async function getPhonesByBrand({
  page,
  brand,
}: {
  page: number;
  brand: string;
}) {
  try {
    const response = await fetch(
      `${backend_url}/api/products/phone/brands/${brand}?page=${page}&limit=8`
    );
    if (!response.ok) {
      throw new Error("Cant fetch phones");
    }
    const res = await response.json();
    console.log(res);
    const products: Product[] = res.items;
    return res;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch phones");
  }
}

export async function getLaptopsPaginated({ page }: { page: number }) {
  try {
    const response = await fetch(
      `${backend_url}/api/products/laptop?page=${page}&limit=12`
    );
    if (!response.ok) {
      throw new Error("Cant fetch laptops");
    }
    const res = await response.json();
    console.log(res);
    const products: Product[] = res.items;
    return res;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch laptops");
  }
}
