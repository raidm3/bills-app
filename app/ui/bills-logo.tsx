import Image from 'next/image';

export default function BillsLogo() {
  return (
    <div
      className="flex flex-row items-center leading-none text-white"
    >
      <Image
        src="/icons/money-bag.svg"
        width={32}
        height={32}
        alt="logo"
      />
      <p className="text-[28px] ms-2">Bills</p>
    </div>
  );
}
