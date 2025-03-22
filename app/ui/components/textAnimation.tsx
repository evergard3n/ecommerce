'use client'
import { useState, useEffect, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages: string[] = ["iPhone 14 chơi game có tốt không?", "Điện thoại nào dưới 5 triệu có pin tốt?", "So sánh iPhone 16 và Galaxy S25 Ultra."];

export default function TextTransition(): JSX.Element {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 4000); // Change text every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-12 overflow-hidden flex items-center justify-center text-white italic ">
      <AnimatePresence mode="wait">
        <motion.div
          key={messages[index]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute"
        >
          {messages[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
