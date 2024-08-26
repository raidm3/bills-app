import Image from 'next/image';
import { UpdateBill } from '@/app/ui/bills/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredBills } from '@/app/lib/data-bills';
import Link from 'next/link';

export default async function BillsTable({
  year,
  month,
  currentPage,
}: {
  year: number;
  month: number;
  currentPage: number;
}) {
  const bills = await fetchFilteredBills(year, month, currentPage);

  return (
    <div className="mt-4 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
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
                <Link
                  key={bill.id}
                  href={`/dashboard/bills/${bill.id}/edit`}
                >
                  <div
                    className="mb-2 w-full rounded-md bg-white p-3"
                  >
                    <div className="flex justify-between">
                      <div className="flex flex-row">
                        <Image
                          src={iconPath}
                          width={18}
                          height={18}
                          alt={bill.label}
                        />
                        <p className="font-medium ms-2">{bill.title}</p>
                      </div>
                      <p className="font-medium">
                        {formatCurrency(bill.value)}
                      </p>
                    </div>
                    <p className="text-xs mt-1">
                      {formatDateToLocal(bill.date)}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
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
        </div>
      </div>
    </div>
  );
}
