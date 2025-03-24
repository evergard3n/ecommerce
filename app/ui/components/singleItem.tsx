import Image from "next/image";
import { Suspense } from "react";
export type SingleItemProps = {
  brand: string;
  name: string;
  price: string;
  image: string;
};
export default function SingleItem(props: SingleItemProps) {
  return (
    <div className="lg:w-full lg:h-108  items-start border border-zinc-200 rounded-md  hover:drop-shadow-lg hover:bg-gradient-to-b bg-white transition-all duration-200 ease-in-out">
      <div className="p-4 flex flex-col justify-between items-center">
        <div className="text-left w-full">
          <h2 className="text-zinc-700">{props.brand}</h2>
          <h3 className="font-bold text-2xl">{props.name}</h3>
          <p>{props.price}</p>
        </div>

        <div className="w-2/3 scale-125 flex-grow h-full pt-8">
          <Suspense fallback={<div className="bg-zinc-300 w-full h-full">Loading...</div>}>
            <Image
              alt={props.name}
              src={
                "https://cdn.hoanghamobile.com/i/previewV2/Uploads/2024/12/02/iphone-16-pro-max-sa-mac-1.png?_gl=1*gjya4f*_gcl_aw*R0NMLjE3NDI3ODAzODAuQ2owS0NRanc0djYtQmhEdUFSSXNBTHBybTMxV1JEaWFRNVhId1owcDZ2NWhSWmxDeHlZVHVIUkU4V1Q4MjRzQmd4VjltUk03TXAxc1ZrVWFBcDBLRUFMd193Y0I.*_gcl_au*MTM0NTg5NjM0Mi4xNzQyNzE2NTU4"
              }
              width={400}
              height={400}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
