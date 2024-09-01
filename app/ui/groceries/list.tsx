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
        {/* <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Titel
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Person
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Betrag
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Datum
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Kategorie
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {bills?.map((bill) => {
                let iconPath = '';
                switch (bill.label) {
                  case 'food':
                    iconPath = '/icons/shopping-cart.svg';
                    break;
                  case 'dinner':
                    iconPath = '/icons/romantic-dinner.svg';
                    break;
                  default:
                    iconPath = '/icons/coins-stacked.svg';
                }
                return (
                  <tr
                    key={bill.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>{bill.title}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {bill.user_name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatCurrency(bill.value)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatDateToLocal(bill.date)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <Image
                        src={iconPath}
                        width={24}
                        height={24}
                        alt={bill.label}
                      />
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateBill id={bill.id} />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
}
