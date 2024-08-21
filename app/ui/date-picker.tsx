'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function DatePicker() {
  const [year, setYear] = useState<number>(2024);
  const [month, setMonth] = useState<number>(new Date().getMonth()+1);

  const years = Array.from({ length: 10 }, (_, i) => i + 2024);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  enum Months {
    Januar = 1,
    Februar,
    März,
    April,
    Mai,
    Juni,
    Juli,
    August,
    September,
    Oktober,
    November,
    Dezember,
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (month) {
      params.set('month', `${month}`);
    }
    if (year) {
      params.set('year', `${year}`);
    }
    replace(`${pathname}?${params.toString()}`);
  }, [year, month]);

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left me-4">
        <div>
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {year}
            <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
          </MenuButton>
        </div>

        <MenuItems
          anchor="bottom start"
          transition
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="py-1">
            {years.map((year) => (
              <MenuItem key={year}>
                <button
                  onClick={() => setYear(year)}
                  className="block w-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                >
                  {year}
                </button>
              </MenuItem>
            ))}
            
          </div>
        </MenuItems>
      </Menu>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {Months[month]}
            <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
          </MenuButton>
        </div>

        <MenuItems
          anchor="bottom start"
          transition
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="py-1">
            {months.map((month) => (
              <MenuItem key={Months[month]}>
                <button
                  onClick={() => setMonth(month)}
                  className="block w-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                >
                  {Months[month]}
                </button>
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}
