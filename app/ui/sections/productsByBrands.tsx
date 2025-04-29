'use client'

import { getPhonesByBrand } from "@/app/lib/data";
import { Product } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import SingleItem from "../products/singleItemNoRounded";

const brands = [
    'Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Vivo'
]
export default function ProductsByBrands() {
    const [products, setProducts] = useState<Product[]>([]);
    const [brand, setBrand] = useState<string>('Apple');
    useEffect(()=>{
        async function fetchProducts() {
            const products = await getPhonesByBrand(brand);
            setProducts(products);
        }
        fetchProducts();
    },[brand])
    return (
        <section className="h-fit py-8 flex flex-col items-center gap-8">
            <h1 className={`text-black text-3xl font-bold`}>Find your favourite products. <span className="text-zinc-600">By your favourite brands</span></h1>
            <ol className="flex flex-row gap-4">
                {brands.map((item, index) => (
                    <li key={index} onClick={() => setBrand(item)} className={`cursor-pointer ${brand === item ? 'font-semibold' : ''}`}>{item}</li>
                ))}
            </ol>
            <div className="grid grid-cols-4 gap-4 w-full">
                {products.map((item, index) => (
                    <SingleItem key={index} {...item} />
                ))}
            </div>
        </section>
    );
}   