'use client';

import { GroceryItem } from "@/app/lib/definitions";
import clsx from 'clsx';
import { updateGroceryItem, deleteGroceryItem } from '@/app/lib/actions-groceries';
import { useState, useEffect } from 'react';
import { TrashIcon, StarIcon } from "@heroicons/react/24/outline";
import Image from 'next/image';
import { TouchEvent } from 'react';

export default function Item({ item }: { item: GroceryItem }) {
  const [isLoading, setIsLoading] = useState(false);
  const [startX, setStartX] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [animate]);

  const handleClick = async (itemId: number) => {
    setIsLoading(true);
    await updateGroceryItem({
      itemId,
      done: !item?.done || false,
    });
    setIsLoading(false);
  };

  const handleDelete = async (itemId: number) => {
    setIsLoading(true);
    await deleteGroceryItem(itemId);
    setIsLoading(false);
  };

  const handleFavorite = async (itemId: number) => {
    setIsLoading(true);
    await updateGroceryItem({
      itemId,
      favorite: !item?.favorite || false,
    });
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
    if (deltaX < 0) {
      handleFavorite(item.id);
      setAnimate(true);
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
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="scroll-container flex items-center mb-2 overflow-auto overflow-x-scroll snap-x snap-mandatory"
    >
      <div className="flex items-center rounded-md min-w-full bg-red-500 p-3 me-[1px]">
        <TrashIcon className="text-white h-4 w-4 sticky left-[95%] top-0" />
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
            {item.done ?
              (<Image src="/icons/circle-check.svg" alt="" width={16} height={16} />) :
              (<Image src="/icons/circle-empty.svg" alt="" width={16} height={16} />)}
            <span className="ms-2">{item.title}</span>
          </div>
          <div className="flex items-center">
            {isLoading ? (<Image src="/icons/loading-dots.svg" alt="" width={24} height={24} />) : ''}
            <StarIcon
              id="favIcon"
              className={clsx(
                "text-yellow-500 h-6 w-6",
                {
                  "hidden": !item.favorite,
                  "tilt-shake": animate,
                },
              )}
            />
          </div>
        </div>
      </button>
      <div id="favoriteBar" className="flex items-center rounded-md min-w-full bg-yellow-500 p-3 me-[1px]">
        <StarIcon className="text-white h-6 w-6 sticky left-[5%] top-0" />
      </div>
    </div>
  );
}