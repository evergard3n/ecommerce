
import Link from 'next/link';

export type navProps = {
    href: string,
    text: string,
    isActive: boolean
}

export function NavItems({href, text, isActive}: navProps ) { 
    
    return (
      <div className={` uppercase text-black text-center w-full flex flex-col items-center text-sm pt-1`}>
          <Link href={href}>{text}</Link>
          <div className={`min-w-6 h-[1px]  ${isActive&&text !== 'Brands' ? 'bg-black' : 'bg-transparent'}`}></div>
      </div>
    )
  }