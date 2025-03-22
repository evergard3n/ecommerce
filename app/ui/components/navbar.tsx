import { GlobeAltIcon, BuildingLibraryIcon } from "@heroicons/react/24/outline";
import { type navProps, NavItems } from "./navitems";
const navItems: navProps[] = [
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
  return (
    <nav className="w-[98%] sticky bg-zinc-50 backdrop-blur-2xl min-h-12 mt-2 mx-auto border border-zinc-200 rounded-lg flex flex-row items-center gap-8 justify-between px-4">
      <ol className="flex flex-row items-center gap-12 flex-grow">
        {navItems.map((item, index) => (
          <li key={index}>
            <NavItems href={item.href} text={item.text} />
          </li>
        ))}
      </ol>
      <div className="flex flex-row gap-4">
        <NavItems href="/login" text="Login" />
        <NavItems href="/search" text="Search" />
      </div>
    </nav>
  );
}
