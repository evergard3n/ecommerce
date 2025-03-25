import { Product, User } from "./definitions";
export const products: Product[] = [
    {
        id: "iphone-14",
        name: "iPhone 14",
        image: "https://via.placeholder.com/150",
        price: "$699",
        brand: "Apple",
        description: "A powerful smartphone with a sleek design.",
        technical_details: {
          product_id: "1",
          screen: {
            size: "6.5 inches",
            refresh_rate: "120Hz"
          },
          camera: {
            front: {
              resolution: "32MP",
              features: "HDR, Night Mode"
            },
            back: {
              resolution: "108MP + 12MP + 5MP",
              features: "Ultra Wide, Telephoto, OIS"
            }
          },
          cpu: {
            cpu_name: "Snapdragon 8 Gen 2",
            os: "Android 13"
          },
          battery: {
            capacity: "5000mAh",
            charge_voltage: "65W Fast Charging"
          }
        }

    }
]