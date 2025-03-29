export interface Product {
    product_id: string;
    name: string;
    image: string;
    price: string;
    brand: string;
    description: string;
    storage: string;
    url:string;
    type: "phone" | "laptop" | "tablet"
}
export interface ProductCoverOnly {
    product_id: string;
    cover_image: string;
    type : "phone" | "laptop" | "tablet"
}

export interface Phone extends Product {}
export interface Laptop extends Product {}

export interface PhoneTechnicalDetails {
    product_id: string,
    screen: {
        size: string,
        refresh_rate: string,

    },
    camera: {
        front: {
            resolution: string,
            features: string,
        } , 
        back: {
            resolution: string,
            features: string,
        }
    }
    cpu: {
        cpu_name: string,
        os: string,
    },
    battery: {
        capacity: string,
        charge_voltage: string,
    },
}

export interface TabletTechnicalDetails extends  PhoneTechnicalDetails {}

export interface LaptopTechnialDetails  {
    cpu : {
        brand: string,
        name: string,
    },
    gpu : {
        discrete_gpu : string,
    },
    ram: {
        capacity: string,
        type: string,
    },
    screen: {
        size: string,
        refresh_rate: string,
    }, 
    battery: {
        capacity: string,
        charger: string,
    }
}

export interface User {
    id: string;
    username: string;
    email: string;
    phone: string;
    search_history: Array<string>;
    recommendations: string[];
}