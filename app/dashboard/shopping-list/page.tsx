import { Suspense } from 'react';
import List from '@/app/ui/shopping-list/list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping List',
};

export default async function Page() {
  // const shoppingItems = await fetchShoppingItems();

  return (
    <div className="w-full">
      <h1 className="hidden md:block text-2xl">Shopping List</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <List />
      </Suspense>
    </div>
  );
}
