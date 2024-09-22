import Form from '@/app/ui/bills/create-form';
import { fetchUsers } from '@/app/lib/data';
 
export default async function Page() {
  const users = await fetchUsers();

  return (
    <main>
      <Form users={users} />
    </main>
  );
}