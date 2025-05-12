"use client";

import { getPhonesByBrand } from "@/app/lib/data";
import { Product } from "@/app/lib/definitions";
import { Suspense, useEffect, useState } from "react";
import SingleItem from "../products/singleItemNoRounded";
import SingleItemFallback from "../components/skeletion/SingleItemFallback";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const brands = ["Apple", "Samsung", "Xiaomi", "Oppo", "Vivo"];
export default function ProductsByBrands() {
  const [products, setProducts] = useState<Product[]>([]);
  const [brand, setBrand] = useState<string>("Apple");
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  useEffect(() => {
    async function fetchProducts() {
      setProducts([]);
      const products = await getPhonesByBrand({ page, brand });
      if (products) {
        setMaxPage(products.totalPages);
        setProducts(products.items);
      }
    }
    fetchProducts();
  }, [brand, page]);
  return (
    <section className="h-fit py-8 flex flex-col items-center gap-8">
      <h1 className={`text-black text-3xl font-bold`}>
        Find your favourite products.{" "}
        <span className="text-zinc-600">By your favourite brands</span>
      </h1>
      <ol className="flex flex-row gap-4">
        {brands.map((item, index) => (
          <li
            key={index}
            onClick={() => setBrand(item)}
            className={`cursor-pointer ${
              brand === item ? "font-semibold" : ""
            }`}
          >
            {item}
          </li>
        ))}
      </ol>
      <div className="grid grid-cols-4 gap-4 w-full">
        {!products && console.log("is empty")}
        {products.length === 0
          ? Array.from({ length: 8 }).map((_, i) => (
              <SingleItemFallback key={i} />
            ))
          : products.map((item, i) => <SingleItem key={i} props={item} type="phone" />)}
      </div>
      <div className="flex flex-row gap-4 items-center">
        <button onClick={() => setPage((prev) => prev - 1)} className="text-black w-5 h-5 disabled:text-zinc-200" disabled={page === 1}><ArrowLeftIcon></ArrowLeftIcon></button>
        {page}
        <button onClick={() => setPage((prev) => prev + 1)} className="text-black w-5 h-5 disabled:text-zinc-200" disabled={page === maxPage}><ArrowRightIcon></ArrowRightIcon></button>
      </div>
    </section>
  );
}
