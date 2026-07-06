import PaginationWrapper from '@/app/ui/bills/pagination-wrapper';
import DatePicker from '@/app/ui/date-picker';
import Table from '@/app/ui/bills/table';
import { CreateBill } from '@/app/ui/bills/buttons';
import { BillsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bills',
};
 
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    month?: string;
    year?: string;
    page?: string;
  };
}) {
  const year = Number(searchParams?.year) || new Date().getFullYear();
  const month = Number(searchParams?.month) || new Date().getMonth() + 1;
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="w-full">
      <h1 className="hidden md:block text-2xl">Bills</h1>
      <div className="flex items-center justify-between gap-2 md:mt-8">
        <DatePicker />
        <CreateBill />
      </div>
      {/* <BillsTableSkeleton /> */}
      <Suspense key={year + month + currentPage} fallback={<BillsTableSkeleton />}>
        <Table year={year} month={month} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Suspense key={`pagination-${year}-${month}`} fallback={null}>
          <PaginationWrapper year={year} month={month} />
        </Suspense>
      </div>
    </div>
  );
}