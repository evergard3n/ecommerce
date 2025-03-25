import { getProductTechnicalDetails } from "@/app/lib/data";
import { Product } from "@/app/lib/definitions";
import {
  CpuChipIcon,
  DevicePhoneMobileIcon,
  BoltIcon
} from "@heroicons/react/24/outline";

export default async function ProductDetails({
  product_id,
}: {
  product_id: string;
}) {
  const technicalDetails = await getProductTechnicalDetails(product_id);
  return (
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
  );
}
