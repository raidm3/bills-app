import { BanknotesIcon } from '@heroicons/react/24/outline';

export default function BillsLogo() {
  return (
    <div
      className="flex flex-row items-center leading-none text-white"
    >
      <BanknotesIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px] ms-2">Bills</p>
    </div>
  );
}
