'use client';

import { CalendarIcon } from '@heroicons/react/24/outline';
import { BarChart } from '@tremor/react';
import { MonthlyBills } from '@/app/lib/definitions';

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default function MonthlyBillsChart({ data }: { data: MonthlyBills[] }) {
  if (!data || data.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  const dataFormatter = (number: number) =>
    Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
      .format(number).toString();

  return (
    <div className="w-full md:col-span-4">
      <div className="rounded-xl bg-gray-50 p-2">
        <h3 className="font-medium p-2">
          Ausgaben der letzten Monate
        </h3>
        <BarChart
          data={data}
          index="month"
          categories={['food', 'dinner']}
          colors={['#14c944', '#db143c']}
          yAxisWidth={52}
          showAnimation={true}
          valueFormatter={dataFormatter}
        />
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Letzte 6 Monate</h3>
        </div>
      </div>
    </div>
  );
}
