'use client';

import clsx from 'clsx';
import { deleteManyGroceryItems } from '@/app/lib/actions-groceries';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Image from 'next/image';

export default function GroceryListActions({ itemIds }: { itemIds: number[]  }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteDone = async () => {
    console.log('handleDeleteDone called');
    setIsLoading(true);
    await deleteManyGroceryItems(itemIds);
    setIsLoading(false);
  };

  return (
    <button
      className={clsx(
        "flex items-center rounded-lg px-4 text-sm font-medium bg-danger text-white h-8",
        { 'bg-red-300': (isLoading || itemIds.length === 0) },
      )}
      onClick={() => handleDeleteDone()}
      disabled={isLoading || itemIds.length === 0}
    >
      {isLoading ? (<Image src="/icons/loading-dots-white.svg" alt="" width={24} height={24} />) : ('Clean Up Items')}
      <TrashIcon className="text-white h-4 w-4 ms-2" />
    </button>
  );
}