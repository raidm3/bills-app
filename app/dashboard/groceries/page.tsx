import { Suspense } from 'react';
import List from '@/app/ui/groceries/list';
import { Metadata } from 'next';
import prisma from '@/app/lib/prisma';

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

  return (
    <div className="w-full">
      <h1 className="hidden md:block text-2xl mb-2">Shopping List</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <List groceries={groceries} categories={categories}/>
      </Suspense>
    </div>
  );
}
