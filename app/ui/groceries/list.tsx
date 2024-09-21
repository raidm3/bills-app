'use client';

import { GroceryItem, GroceryCategory } from '@/app/lib/definitions';
import { Suspense } from 'react';
import Item from '@/app/ui/groceries/item';
import { CreateGroceryItem } from './buttons';
import { LoadingSkeleton } from '@/app/ui/skeletons';

export default function ShoppingList({
  groceries,
  categories,
}: {
  groceries: GroceryItem[];
  categories: GroceryCategory[];
}) {
  return (
    <div className="flow-root">
      <div className="inline-block min-w-full align-middle">
        <CreateGroceryItem />
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
                        <Item item={item} />
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
