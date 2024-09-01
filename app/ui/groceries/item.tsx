'use client';

import { GroceryItem } from "@/app/lib/definitions";
import clsx from 'clsx';
import { updateGroceryItem, deleteGroceryItem } from '@/app/lib/actions-groceries';
import { useState, useRef } from 'react';
import { TrashIcon } from "@heroicons/react/24/outline";
import Image from 'next/image';
import { TouchEvent } from 'react';

export default function Item({ item }: { item: GroceryItem }) {
  const wrapperRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleClick = async (itemId: number) => {
    setIsLoading(true);
    await updateGroceryItem({
      itemId,
      done: item?.done || false,
    });
    setIsLoading(false);
  };

  const handleDelete = async (itemId: number) => {
    setIsLoading(true);
    await deleteGroceryItem(itemId);
    setIsLoading(false);
  };

  const handleSwipe = ({ deltaX }: { deltaX: number }) => {
    const SWIPE_THRESHOLD = 80;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) {
      return;
    }
    if (deltaX > 0) {
      handleDelete(item.id);
    }
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX;

    handleSwipe({ deltaX });
  };

  return (
    <div
      ref={wrapperRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="scroll-container flex items-center mb-2 overflow-auto overflow-x-scroll snap-x snap-mandatory"
    >
      <div
        className="flex items-center rounded-md min-w-full bg-red-500 p-3 me-[1px]"
      >
        <TrashIcon className="text-white h-4 w-4 sticky left-[5%] top-0" />
      </div>
      <button
        className={clsx(
          "text-center rounded-md min-w-full p-2 snap-start",
          {'bg-green-200 text-gray-500': item.done, 'bg-white': !item.done },
        )}
        onClick={() => handleClick(item.id)}
        disabled={isLoading}
      >
        <div className="flex justify-between">
          <div className="flex items-center">
            {item.done ? (<Image src="/icons/circle-check.svg" alt="" width={16} height={16} />) : (<Image src="/icons/circle-empty.svg" alt="" width={16} height={16} />)}
            <span className="ms-2">{item.title}</span>
          </div>
          <div className="flex items-center">
            {isLoading ? (<Image src="/icons/loading-dots.svg" alt="" width={24} height={24} />) : ''}
          </div>
        </div>
      </button>
    </div>
  );
}