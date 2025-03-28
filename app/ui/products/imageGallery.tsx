"use client";
import { AnimatePresence, motion } from "framer-motion";
import { div, li } from "framer-motion/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";
const preloadImages = (urls: string[]) => {
    urls.forEach((url) => {
      const img = new globalThis.Image(); // Tạo image object ẩn
      img.src = url;           // Trình duyệt sẽ tự động tải ảnh
    });
  };
export default function ImageGallery({ imageUrls }: { imageUrls: string[] }) {
  const [index, setIndex] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 10000); // Change text every 2 seconds

    return () => clearInterval(interval);
  });
  useEffect(() => {
    preloadImages(imageUrls);
  },[imageUrls])
  function onClickLeft() {
    setIndex(
      (prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
  }
  function onClickRight() {
    setIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  }
  return (
    <div className="w-2/3 h-160 relative flex-grow z-20 bg-white flex items-center justify-center drop-shadow-md rounded-2xl border-8 border-zinc-50 overflow-clip">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full flex flex-row items-center justify-center"
        >
          <Image alt={"imageAe"} src={imageUrls[index]} layout="fill" objectFit="contain"/>
        </motion.div>
      </AnimatePresence>
      <button
        onClick={onClickLeft}
        className="absolute top-1/2 left-0 ml-4 bg-white rounded-full hover:bg-zinc-50 transition-colors duration-150 ease-in-out drop-shadow-md w-10 h-10 flex items-center justify-center"
      >
        <ArrowLongLeftIcon className="w-6 h-6 text-zinc-400" />
      </button>
      <button
        onClick={onClickRight}
        className="absolute top-1/2 right-0 mr-4 bg-white rounded-full hover:bg-zinc-50 transition-colors duration-150 ease-in-out drop-shadow-md w-10 h-10 flex items-center justify-center"
      >
        <ArrowLongRightIcon className="w-6 h-6 text-zinc-400" />
      </button>
      <div className="w-fit h-fit absolute bottom-0 rounded-2xl mb-1">
        <ol className="flex flex-row gap-1 px-1 py-1 ">
          {imageUrls.map((item, i) => (
            <li
              key={i}
              className={`${i === index ? "bg-zinc-500 w-4" : "bg-zinc-200 w-2"}  h-2 rounded-full`}
            ></li>
          ))}
        </ol>
      </div>
    </div>
  );
}
