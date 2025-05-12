export interface Product {
    id: string;
    name: string;
    image: string;
    price: string;
    brand: string;
    description: string;
    storage: string;
}
export interface TechnicalDetails {
    product_id: string;
    screen: {
        size: string;
        refresh_rate: string;
    };
    camera: {
        front: {
            resolution: string;
            features: string;
        };
        back: {
            resolution: string;
            features: string;
        };
    };
    cpu: {
        cpu_name: string;
        os: string;
    };
    battery: {
        capacity: string;
        charge_voltage: string;
    };
}
export interface User {
    id: string;
    username: string;
    email: string;
    phone: string;
    search_history: Array<string>;
    recommendations: string[];
}
export declare const products: Product[];
export declare const technical_details: TechnicalDetails[];
declare const _default: {
    products: Product[];
    technical_details: TechnicalDetails[];
};
export default _default;
