import { fetchBillsData } from '@/app/lib/data-bills';
import Image from 'next/image';
import AnimatedNumber from '@/app/ui/animated-number';

const iconPath = {
  food: '/icons/shopping-cart.svg',
  dinner: 'icons/romantic-dinner.svg',
  misc: '/icons/coins-stacked.svg',
};

export default async function CardWrapper() {
  const {
    totalBillsFood,
    totalBillsDinner,
    totalBillsMisc,
  } = await fetchBillsData();

  return (
    <>
      <CombinedCard title="Aktuelle Ausgaben" values={[
        { value: totalBillsFood, type: 'food' },
        { value: totalBillsDinner, type: 'dinner' },
        { value: totalBillsMisc, type: 'misc' },
      ]} />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number;
  type: 'food' | 'dinner' | 'misc';
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        <Image
          src={iconPath[type]}
          width={24}
          height={24}
          alt={type}
        />
        <h3 className="ml-2 font-medium">{title}</h3>
      </div>
      <p
        className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl"
      >
        <AnimatedNumber end={value} duration={1000} />
      </p>
    </div>
  );
}

export function CombinedCard({
  title,
  values,
}: {
  title: string;
  values: [
    { value: number, type: 'food' | 'dinner' | 'misc' },
    { value: number, type: 'food' | 'dinner' | 'misc' },
    { value: number, type: 'food' | 'dinner' | 'misc' }
  ];
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <h3 className="font-medium p-2">
        {title} im {new Date().toLocaleDateString('de-DE', { month: 'long' })}
      </h3>
      <div className="grid grid-cols-3 gap-4 rounded-xl bg-white px-4 py-8 text-center">
        {values.map(({ value, type }) => (
          <div
            key={`${type}-card-${value}"}`}
            className="flex flex-col items-center"
          >
            <Image
              src={iconPath[type]}
              width={24}
              height={24}
              alt={type}
              className="mb-2"
            />
            <span className="font-medium text-center text-lg ms-1">
              <AnimatedNumber end={value} duration={1000} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
