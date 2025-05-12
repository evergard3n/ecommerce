import LaptopsPaginated from "@/app/ui/sections/laptopsPaginated";

export default async function Page({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Laptops</h1>
      <p>{currentPage}</p>
      <LaptopsPaginated currentPage={currentPage} />
    </main>
  );
}
