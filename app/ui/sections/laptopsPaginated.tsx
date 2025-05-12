import { getLaptopsPaginated } from "@/app/lib/data";
import SingleItem from "../products/singleItem";
import Link from "next/link";
import { Product } from "@/app/lib/definitions";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default async function LaptopsPaginated({
  currentPage,
}: {
  currentPage: number;
}) {
  const { items: laptops, totalPages: total_pages } = await getLaptopsPaginated({
    page: currentPage,
  });

  return (
    <section className="w-full py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {laptops.map((laptop: Product) => (
          <SingleItem key={laptop.product_id} props={laptop} type="laptop" />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">

        <Link
          // href={`/products/laptops?page=${currentPage === 1 ? "" : currentPage - 1}`}
          href={`${currentPage === 1 ? "" : `/products/laptops?page=${currentPage - 1}`}`}
          className={`px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-md transition-colors ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </Link>

        <span className="text-zinc-600">
          Page {currentPage} of {total_pages}
        </span>

        <Link
          href={`${currentPage === total_pages ? "" : `/products/laptops?page=${currentPage + 1}`}`}
          className={`px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-md transition-colors ${currentPage === total_pages ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <ArrowRightIcon className="w-4 h-4" />
        </Link>

      </div>
    </section>
  );
}
