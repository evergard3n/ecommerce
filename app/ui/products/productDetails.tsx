import { getProductTechnicalDetails } from "@/app/lib/data";
import { PhoneTechnicalDetails, LaptopTechnialDetails, Product } from "@/app/lib/definitions";
import {
  CpuChipIcon,
  DevicePhoneMobileIcon,
  BoltIcon,
  ComputerDesktopIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";

export default async function ProductDetails({
  product_id,
  type,
}: {
  product_id: string;
  type: "phone" | "laptop";
}) {
  const technicalDetails_pre = await getProductTechnicalDetails(product_id, type);
  
  if (type === "phone") {
    const technicalDetails: PhoneTechnicalDetails = {
      product_id: product_id,
      screen: {
        size: technicalDetails_pre.screen.split("\n")[1] || "",
        refresh_rate: technicalDetails_pre.screen.split("\n")[4] || "",
      },
      cpu: {
        cpu_name: technicalDetails_pre.cpu.split("\n")[1] || "",
        os: "",
      },
      battery: {
        capacity: technicalDetails_pre.battery.split("\n")[1] || "",
        charge_voltage: technicalDetails_pre.battery.split("\n")[2] || "",
      },
      camera: {
        front: {
          resolution: "",
          features: "",
        },
        back: {
          resolution: "",
          features: "",
        },
      },
    };

    return (
      <div>
        <div className="grid grid-cols-2 gap-4 w-full h-fit">
          <div className="flex flex-row gap-2 items-center">
            <CpuChipIcon className="w-10 h-10" />
            <div className="text-sm">
              <p>{technicalDetails.cpu.cpu_name}</p>
              <p>{technicalDetails.cpu.os}</p>
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <DevicePhoneMobileIcon className="w-8 h-8" />
            <div className="text-sm">
              <p>{technicalDetails.screen.size}</p>
              <p>{technicalDetails.screen.refresh_rate}</p>
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center pl-1">
            <BoltIcon className="w-8 h-8 " />
            <div className="text-sm pl-1">
              <p>{technicalDetails.battery.capacity}</p>
              <p>{technicalDetails.battery.charge_voltage}</p>
            </div>
          </div>
        </div>
        <button className="mt-4 bg-zinc-700 text-white px-4 py-2 rounded-full text-xs flex items-center justify-center">
          <p>Show Full Details</p>
        </button>
        <div className="w-12 h-12 absolute top-0 bg-black"></div>
      </div>
    );
  } else {
    // Laptop technical details
    const technicalDetails: any = {
      cpu: technicalDetails_pre.cpu,
      more: technicalDetails_pre.more,
      ram: technicalDetails_pre.ram,
      screen: technicalDetails_pre.screen,
      battery: technicalDetails_pre.battery,
    };

    return (
      <div>
        <div className="grid grid-cols-1 gap-4 w-full h-fit">
          <div className="flex flex-row gap-2 items-center">
            <CpuChipIcon className="w-10 h-10" />
            <div className="text-sm">
              <p>{technicalDetails.cpu}</p>
              
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <ComputerDesktopIcon className="w-8 h-8" />
            <div className="text-sm">
              <p>{technicalDetails.more}</p>
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <CircleStackIcon className="w-8 h-8" />
            <div className="text-sm">
              <p>{technicalDetails.ram}</p>
            
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <DevicePhoneMobileIcon className="w-8 h-8" />
            <div className="text-sm">
              <p>{technicalDetails.screen}</p>
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center pl-1">
            <BoltIcon className="w-8 h-8" />
            <div className="text-sm pl-1">
              <p>{technicalDetails.battery}</p>
            </div>
          </div>
        </div>
        <button className="mt-4 bg-zinc-700 text-white px-4 py-2 rounded-full text-xs flex items-center justify-center">
          <p>Show Full Details</p>
        </button>
      </div>
    );
  }
}
