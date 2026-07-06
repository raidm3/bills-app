import Pagination from '@/app/ui/bills/pagination';
import { fetchBillsPages } from '@/app/lib/data';

export default async function PaginationWrapper({
  year,
  month,
}: {
  year: number;
  month: number;
}) {
  const totalPages = await fetchBillsPages(year, month);

  return <Pagination totalPages={totalPages} />;
}
