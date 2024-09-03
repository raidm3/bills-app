import { Suspense } from 'react';
import GroceryListActions from '@/app/ui/groceries/list-actions';
import List from '@/app/ui/groceries/list';
import { Metadata } from 'next';
import prisma from '@/app/lib/prisma';
import { LoadingSkeleton } from '@/app/ui/skeletons';

export const metadata: Metadata = {
  title: 'Shopping List',
};

export default async function Page() {
  const groceries = await prisma.groceries.findMany({
    select: { id: true, title: true, category: true, done: true, created_at: true },
    orderBy: { id: 'asc' },
  });
  const categories = [
    { key: 'vegetables', label: 'Obst & Gemüse'},
    { key: 'meat', label: 'Fleisch & Fisch'},
    { key: 'basics', label: 'Basisprodukte'},
    { key: 'cooled', label: 'Kühlprodukte'},
    { key: 'other', label: 'Sonstiges'},
  ];
  const itemIds = groceries.filter((g) => g.done).map((g) => g.id);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-xl">Einkaufsliste</h1>
        <GroceryListActions itemIds={itemIds} />
      </div>
      <Suspense fallback={<LoadingSkeleton />}>
        <List groceries={groceries} categories={categories} />
      </Suspense>
    </div>
  );
}
