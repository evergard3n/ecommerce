import Image from "next/image";
export type SingleItemProps = {
  brand: string;
  name: string;
  price: string;
  image: string;
};
export default function SingleItem(props: SingleItemProps) {
  return (
    <div className="lg:w-98 lg:h-108  items-start border border-zinc-200 rounded-md  hover:drop-shadow-lg hover:bg-gradient-to-b bg-white transition-all duration-200 ease-in-out">
      <div className="p-4 flex flex-col justify-between items-center">
        <div className="text-left w-full">
        <h2 className="text-zinc-700">{props.brand}</h2>
        <h3 className="font-bold text-2xl">{props.name}</h3>
        <p>{props.price}</p>
        </div>
        <div className="w-2/3 flex-grow h-full pt-8">
          <Image alt={props.name} src={props.image} width={200} height={200} />
        </div>
      </div>
    </div>
  );
}
