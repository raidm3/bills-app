import CardWrapper from '@/app/ui/dashboard/cards';
import MonthlyBillsChartWrapper from '@/app/ui/dashboard/monthly-bills-chart-wrapper';
import BillDiffs from '@/app/ui/dashboard/bill-diffs';
import { Suspense } from 'react';
import {
  CardsSkeleton,
  MonthlyBillsChartSkeleton,
  BillDiffsSkeleton,
} from '@/app/ui/skeletons';

export const revalidate = 3600;

export default function Page() {
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
          <MonthlyBillsChartWrapper />
        </Suspense>
        <Suspense fallback={<BillDiffsSkeleton />}>
          <BillDiffs />
        </Suspense>
      </div>
    </main>
  );
}
