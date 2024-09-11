'use client';

import React, { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(searchValue);

    const params = new URLSearchParams(searchParams);
    params.set('query', `${searchValue}`);
    replace(`${pathname}?${params.toString()}`);
  };

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-3">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium sr-only"
      >
        Suchen
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <MagnifyingGlassIcon width={16} height={16} />
        </div>
        <input
          type="search"
          id="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " 
          placeholder="Rezepte suchen"
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-primary font-medium rounded-lg text-sm px-4 py-2"
        >
          Suchen
        </button>
      </div>
    </form>
  );
}
