"use client";
import { GlobeAltIcon, BuildingLibraryIcon } from "@heroicons/react/24/outline";
import { type navProps, NavItems } from "./navitems";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  SignedOut,
  SignInButton,
  SignUpButton,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
const navItems = [
  {
    href: "/",
    text: "Home",
  },
  {
    href: "/",
    text: "Brands",
  },
  {
    href: "/products/phones",
    text: "Phones",
  },
  {
    href: "/products/tablets",
    text: "Tablets",
  },
  {
    href: "/products/laptops",
    text: "Laptops",
  },
  {
    href: "/products/accessories",
    text: "Accesories",
  },
];

export default function NavBar() {
  const [isActive, setIsActive] = useState<string>("");
  const path = usePathname();
  useEffect(() => {
    setIsActive(path);
  }, [path]);
  return (
    <nav className="w-[98%] fixed z-20   backdrop-blur-sm min-h-12 mt-2 mx-auto border border-zinc-200 rounded-lg flex flex-row items-center gap-8 justify-between px-4">
      <ol className="flex flex-row items-center gap-12">
        <h1 className="font-black text-2xl">ecom</h1>
        {navItems.map((item, index) => (
          <li key={index}>
            <NavItems
              href={item.href}
              text={item.text}
              isActive={isActive === item.href}
            />
          </li>
        ))}
      </ol>
      <div className="flex flex-row gap-12 uppercase">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
function useLayoutEffect(arg0: () => void, arg1: string[]) {
  throw new Error("Function not implemented.");
}
