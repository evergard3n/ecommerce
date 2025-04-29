import Link from "next/link";

export type navProps = {
  href: string;
  text: string;
  isActive: boolean;
  items: {
    href: string;
    text: string;
  }[];
};

export function NavItems({ href, text, isActive, items }: navProps) {
  return (
    <div
      className={` uppercase text-black text-center group w-full h-fit group  items-center text-sm pt-1`}
    >
      <Link href={href}>{text}</Link>
      <div
        className={`min-w-6 h-[1px]  ${
          isActive && text !== "Brands" ? "bg-black" : "bg-transparent"
        }`}
      ></div>
      <div
        className={`min-w-6 h-[1px]  group-hover:bg-black bg-transparent'}`}
      ></div>
    </div>
  );
}
