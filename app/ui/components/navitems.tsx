'use client';
import Link from 'next/link';
import { usePathname } from "next/navigation";
export type navProps = {
    href: string,
    text: string
}

export function NavItems(props: navProps) {
    const path = usePathname();
    const isActive = path === props.href;
    return (
      <div className={`uppercase text-black text-center w-full flex flex-col items-center text-sm pt-1`}>
          <Link href={props.href}>{props.text}</Link>
          <div className={`min-w-6 h-[2px] bg-black ${isActive&&props.text !== 'Brands' ? '' : 'hidden'}`}></div>
      </div>
    )
  }