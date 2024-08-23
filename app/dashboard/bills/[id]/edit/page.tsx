
import Form from '@/app/ui/bills/edit-form';
import { fetchUsers, fetchBillById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const [bill, users] = await Promise.all([
    fetchBillById(id),
    fetchUsers(),
  ]);

  if (!bill) {
    notFound();
  }

  return (
    <main>
      <Form bill={bill} users={users} />
    </main>
  );
}