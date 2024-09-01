import { sql } from '@vercel/postgres';
import {
  UserField,
  BillForm,
} from './definitions';


const ITEMS_PER_PAGE = 10;

export async function fetchBillsPages(year: number, month: number) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM bills
    WHERE
        bills.date >= ${`${year}-${month}-01`}
        AND bills.date < ${`${year}-${(month+1)%12}-01`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of bills.');
  }
}

export async function fetchBillById(id: string) {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate network delay
    const data = await sql<BillForm>`
      SELECT
        bills.id,
        bills.user_id,
        bills.title,
        bills.value,
        bills.label,
        bills.date
      FROM bills
      WHERE bills.id = ${id};
    `;

    const bill = data.rows.map((bill) => ({
      ...bill,
      // Convert amount from cents to dollars
      value: bill.value / 100,
    }));

    return bill[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch bill.');
  }
}

export async function fetchUsers() {
  try {
    const data = await sql<UserField>`
      SELECT
        id,
        name
      FROM users
      ORDER BY name ASC
    `;

    const users = data.rows;
    return users;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all users.');
  }
}
