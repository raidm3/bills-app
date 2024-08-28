'use client';

import Image from 'next/image';
import { UpdateBill } from '@/app/ui/bills/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredBills } from '@/app/lib/data-bills';
import Link from 'next/link';
import clsx from 'clsx';

export default async function ShoppingList() {
  // const shoppingItems = await fetchShoppingItems();
  const categories = [
    { key: 'vegetables', label: 'Obst & Gemüse'},
    { key: 'meat', label: 'Fleisch & Fisch'},
    { key: 'basics', label: 'Basisprodukte'},
    { key: 'cooled', label: 'Kühlprodukte'},
    { key: 'other', label: 'Sonstiges'},
  ];
  const shoppingItems = [
    {
      id: '1',
      title: 'Milch',
      category: 'cooled',
      done: false,
      created_at: '2022-12-31 15:30:00',
    },
    {
      id: '2',
      title: 'Eier',
      category: 'basics',
      done: true,
      created_at: '2022-12-31 15:35:00',
    },
    {
      id: '3',
      title: 'Topfen',
      category: 'cooled',
      done: false,
      created_at: '2022-12-31 15:40:00',
    },
    {
      id: '4',
      title: 'Bananen',
      category: 'vegetables',
      done: false,
      created_at: '2022-12-31 15:40:00',
    },
    {
      id: '5',
      title: 'Paprika',
      category: 'vegetables',
      done: true,
      created_at: '2022-12-31 15:40:00',
    },
    {
      id: '6',
      title: 'Hühnchen',
      category: 'meat',
      done: true,
      created_at: '2022-12-31 15:40:00',
    },
    {
      id: '7',
      title: 'Lachs',
      category: 'meat',
      done: false,
      created_at: '2022-12-31 15:40:00',
    },
    {
      id: '8',
      title: 'Haferflocken',
      category: 'basics',
      done: true,
      created_at: '2022-12-31 15:40:00',
    },
    {
      id: '9',
      title: 'Klopapier',
      category: 'other',
      done: false,
      created_at: '2022-12-31 15:40:00',
    },
    {
      id: '10',
      title: 'Duschgel',
      category: 'other',
      done: false,
      created_at: '2022-12-31 15:40:00',
    },
  ];
  const handleClick = async (itemId: string) => {
    console.log('Clicked on item:', itemId);
    const item = shoppingItems.find((item) => item.id === itemId);
    if (item) {
      item.done = !item.done;
    }
  };

  return (
    <div className="mt-2 flow-root">
      <div className="inline-block min-w-full align-middle">
        {categories.map((category) => {
          return (
            <div
              key={category.key}
              className="rounded-lg bg-gray-50 p-2 mb-4"
            >
              <h3 className="text-start text-sm mb-2">{category.label}</h3>
              <div className="md:hidden">
                {shoppingItems?.map((item) => {
                  if (category.key === item.category) {
                    return (
                      <div
                        key={item.id}
                        className="mb-2 w-full text-center rounded-md bg-white p-2"
                        onClick={() => handleClick(item.id)}
                      >
                        <p className={clsx(
                          "",
                          {
                            'line-through': item.done,
                          },
                        )}>
                          {item.title}
                        </p>
                      </div>
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
