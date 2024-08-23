import CardWrapper from '@/app/ui/dashboard/cards';
import MonthlyBillsChart from '@/app/ui/dashboard/monthly-bills-chart';
import BillDiffs from '@/app/ui/dashboard/bill-diffs';
import { fetchBillsPerMonth } from '@/app/lib/data-bills';
import { Suspense } from 'react';
import { MonthlyBills, BillPerMonthAndLabel } from '@/app/lib/definitions';
import { aggregateDataByMonth } from '@/app/lib/utils';
import {
  MonthlyBillsChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';
 
export default async function Page() {
  const billsPerMonth: BillPerMonthAndLabel[] = await fetchBillsPerMonth();

  const data: MonthlyBills[] = billsPerMonth.reduce((acc: MonthlyBills[], { month, label, total_value }: BillPerMonthAndLabel) => {
    const existing = acc.find(item => item.month === month);

    if (existing) {
      existing[label] = total_value;
    } else {
      acc.push({ month, [label]: total_value });
    }

    return acc;
  }, []);

  return (
    <main>
      <h1 className="hidden md:block mb-4 text-xl md:text-2xl">
        Dashboard
      </h1>
      <div>
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<MonthlyBillsChartSkeleton />}>
          <MonthlyBillsChart data={data} />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <BillDiffs />
        </Suspense>
      </div>
    </main>
  );
}