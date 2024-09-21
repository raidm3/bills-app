'use client';

import { GroceryItem, GroceryCategory } from '@/app/lib/definitions';
import { Suspense } from 'react';
import Item from '@/app/ui/groceries/item';
import { CreateGroceryItem } from './buttons';
import { LoadingSkeleton } from '@/app/ui/skeletons';
import { useState } from 'react';
import Image from 'next/image';
import { updateGroceryItems } from '@/app/lib/actions-groceries';

export default function ShoppingList({
  groceries,
  categories,
}: {
  groceries: GroceryItem[];
  categories: GroceryCategory[];
}) {
  const [updatedItems, setUpdatedItems] = useState<GroceryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleItemUpdated = (item: GroceryItem) => {
    if (! updatedItems.find((i) => i.id === item.id)) {
      setUpdatedItems([
        ...updatedItems,
        item,
      ]);
    } else {
      setUpdatedItems(updatedItems.filter((i) => i.id !== item.id));
    }
  };

  const updateItems = async () => {
    setIsLoading(true);
    await updateGroceryItems(updatedItems);
    setUpdatedItems([]);
    setIsLoading(false);
  };

  return (
    <div className="flow-root">
      <div className="inline-block min-w-full align-middle">
        <CreateGroceryItem />
        {updatedItems.length > 0 && (
          <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 z-50">
            <button
              className="flex items-center rounded-full bg-success py-4 px-6 text-sm font-medium text-white transition-colors"
              onClick={() => updateItems()}
            >
              {isLoading ? (
                <Image src="/icons/loading-dots-white.svg" alt="Loading" width={24} height={24} />
              ) : (
                <span>Speichern</span>
              )}
            </button>
          </div>
        )}
        {categories.map((category) => {
          return (
            <div
              key={category.key}
              className="rounded-lg bg-gray-50 p-2 mb-4"
            >
              <h3 className="text-start text-sm mb-2 font-bold">{category.label}</h3>
              <div className="md:hidden">
                {groceries?.map((item) => {
                  if (category.key === item.category) {
                    return (
                      <Suspense key={item.id} fallback={<LoadingSkeleton />}>
                        <Item item={item} onItemUpdated={handleItemUpdated} />
                      </Suspense>
                    );
                  }
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
