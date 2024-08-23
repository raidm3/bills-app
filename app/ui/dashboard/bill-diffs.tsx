// @ts-nocheck
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { fetchUsers } from '@/app/lib/data';
import { fetchBillsDiffPerUser } from '@/app/lib/data-bills';
import { BillPerUserAndMonth, MonthlyBillsPerUser } from '@/app/lib/definitions';

export default async function BillDiffs() {
  const bills = await fetchBillsDiffPerUser();
  const users = await fetchUsers();
  console.log(users);

  if (!bills || bills.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  const dataFormatter = (number: number) =>
    Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 })
      .format(number).toString();

  function transformData(dataArray) {
    const grouped = dataArray.reduce((acc, curr) => {
      // Create a unique key for each month and year
      const key = `${curr.month}-${curr.year}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(curr);
      return acc;
    }, {});
  
    const result = [];
    Object.keys(grouped).forEach(key => {
      if (grouped[key].length === 1) {
        const first = grouped[key][0];
        result.push({
          month: first.month,
          year: first.year,
          user_id: first.user_id,
          diff: dataFormatter(first.total_value),
        });
      }
      if (grouped[key].length === 2) {
        const [first, second] = grouped[key];
        const diff = Math.abs(first.total_value - second.total_value);
        const user_id = Math.abs(first.total_value) > Math.abs(second.total_value) ? first.user_id : second.user_id;
  
        result.push({
          month: first.month,
          year: first.year,
          user_id,
          diff: dataFormatter(diff),
        });
      }
    });
  
    return result;
  }

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-2">
        <h3 className="font-medium p-2">
          Differenz Zahlungen
        </h3>
        <div className="bg-white px-6">
          {transformData(bills).map((bill, i) => {
            return (
              <div
                key={`${bill.month}-${bill.year}`}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="text-sm">{`${bill.month} ${bill.year}`}</div>
                <div className="truncate text-sm font-semibold md:text-base">
                  {users.find((user) => user.id === bill.user_id)?.name}
                </div>
                <div
                  className="truncate text-sm font-medium md:text-base"
                >
                  +{bill.diff}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
