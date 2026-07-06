import MonthlyBillsChart from '@/app/ui/dashboard/monthly-bills-chart';
import { fetchBillsPerMonth } from '@/app/lib/data-bills';
import { MonthlyBills, BillPerMonthAndLabel } from '@/app/lib/definitions';

export default async function MonthlyBillsChartWrapper() {
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

  return <MonthlyBillsChart data={data} />;
}
