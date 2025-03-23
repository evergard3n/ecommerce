export interface Product {
    id: string;
    name: string;
    image: string;
    price: string;
    brand: string;
    description: string;
}
export interface User {
    id: string;
    username: string;
    email: string;
    phone: string;
    search_history: Array<string>;
    recommendations: string[];
}