"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
const featuredItems = [
  {
    id: 1,
    name: "iPhone 16e",
    image:
      "https://cdn.hoanghamobile.com/i/preview-h-V2/Uploads/2025/02/20/iphone-16e-trang-1.png",
    href: "/products/1"
  },
  {
    id: 2,
    name: "Samsung Galaxy S25 Ultra",
    image:
      "https://cdn.hoanghamobile.com/i/preview-h-V2/Uploads/2025/02/11/galaxy-s25-ultra-titan-silver-blue-3.png",
    href: "/products/2"
  },
];

export default function Featured() {
  const [index, setIndex] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % featuredItems.length);
    }, 10000); // Change text every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Link className="w-full h-36  bg-white border-t border-b border-zinc-200 overflow-clip px-10" href={featuredItems[index].href}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full flex flex-row justify-between"
        >
          <div className="flex-grow h-full flex flex-col justify-center">
            <h1 className="text-amber-600 text-lg">All new</h1>
            <h1 className="text-5xl font-bold">{featuredItems[index].name}</h1>
          </div>
          <div className="w-96 h-96 scale-150 ">
            <Image
              alt="featured"
              src={featuredItems[index].image}
              width={400}
              height={400}
            ></Image>
          </div>
        </motion.div>
      </AnimatePresence>
    </Link>
  );
}
