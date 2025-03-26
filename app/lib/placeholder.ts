import { Product, TechnicalDetails, User } from "./definitions";
export const products: Product[] = [
  {
    id: "iphone-14",
    name: "iPhone 14",
    image: "/images/iphone-14.jpg",
    price: "$699",
    brand: "Apple",
    description: "A powerful smartphone with a sleek design.",
    
  },
  {
    id: "iphone-15",
    name: "iPhone 15",
    image: "/images/iphone-14.jpg",
    price: "$699",
    brand: "Apple",
    description: "A powerful smartphone with a sleek design.",
    
  },
  {
    id: "iphone-16",
    name: "iPhone 16",
    image: "/images/iphone-14.jpg",
    price: "$699",
    brand: "Apple",
    description: "A powerful smartphone with a sleek design.",
    
  },
  {
    id: "iphone-17",
    name: "iPhone 17",
    image: "/images/iphone-14.jpg",
    price: "$699",
    brand: "Apple",
    description: "A powerful smartphone with a sleek design.",
    
  },
];

export const technical_details: TechnicalDetails[] = [
  {
    product_id: "iphone-14",
    screen: {
      size: "6.5 inches",
      refresh_rate: "120Hz",
    },
    camera: {
      front: {
        resolution: "32MP",
        features: "HDR, Night Mode",
      },
      back: {
        resolution: "108MP + 12MP + 5MP",
        features: "Ultra Wide, Telephoto, OIS",
      },
    },
    cpu: {
      cpu_name: "Snapdragon 8 Gen 2",
      os: "Android 13",
    },
    battery: {
      capacity: "5000mAh",
      charge_voltage: "65W Fast Charging",
    },
  },
  {
    product_id: "iphone-15",
    screen: {
      size: "6.5 inches",
      refresh_rate: "120Hz",
    },
    camera: {
      front: {
        resolution: "32MP",
        features: "HDR, Night Mode",
      },
      back: {
        resolution: "108MP + 12MP + 5MP",
        features: "Ultra Wide, Telephoto, OIS",
      },
    },
    cpu: {
      cpu_name: "Snapdragon 8 Gen 2",
      os: "Android 13",
    },
    battery: {
      capacity: "5000mAh",
      charge_voltage: "65W Fast Charging",
    },
  },
  {
    product_id: "iphone-16",
    screen: {
      size: "6.5 inches",
      refresh_rate: "120Hz",
    },
    camera: {
      front: {
        resolution: "32MP",
        features: "HDR, Night Mode",
      },
      back: {
        resolution: "108MP + 12MP + 5MP",
        features: "Ultra Wide, Telephoto, OIS",
      },
    },
    cpu: {
      cpu_name: "Snapdragon 8 Gen 2",
      os: "Android 13",
    },
    battery: {
      capacity: "5000mAh",
      charge_voltage: "65W Fast Charging",
    },
  },
  {
    product_id: "iphone-17",
    screen: {
      size: "6.5 inches",
      refresh_rate: "120Hz",
    },
    camera: {
      front: {
        resolution: "32MP",
        features: "HDR, Night Mode",
      },
      back: {
        resolution: "108MP + 12MP + 5MP",
        features: "Ultra Wide, Telephoto, OIS",
      },
    },
    cpu: {
      cpu_name: "Snapdragon 8 Gen 2",
      os: "Android 13",
    },
    battery: {
      capacity: "5000mAh",
      charge_voltage: "65W Fast Charging",
    },
  },
]