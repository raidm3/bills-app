import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { users, bills } from '../lib/placeholder-data';

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedBills() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS bills (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      title VARCHAR(255) NOT NULL,
      value INT NOT NULL,
      label VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedBills = await Promise.all(
    bills.map(
      (bill) => client.sql`
        INSERT INTO bills (user_id, title, value, label, date)
        VALUES (${bill.user_id}, ${bill.title}, ${bill.value}, ${bill.label}, ${bill.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedBills;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    // await seedUsers();
    // await seedBills();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
