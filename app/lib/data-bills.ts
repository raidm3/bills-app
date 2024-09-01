import { sql } from '@vercel/postgres';
import {
  BillsTable,
} from './definitions';


export async function fetchBillsData() {
  try {
    const year = new Date().getFullYear();
    const month = new Date().getMonth()+1;

    const billsSumByLabel = sql`
      SELECT
        SUM(CASE WHEN label = 'food' THEN value ELSE 0 END) AS "food",
        SUM(CASE WHEN label = 'dinner' THEN value ELSE 0 END) AS "dinner",
        SUM(CASE WHEN label = 'misc' THEN value ELSE 0 END) AS "misc"
      FROM bills
      WHERE
        bills.date >= ${`${year}-${month}-01`}
        AND bills.date < ${`${year}-${(month+1)%12}-01`}
    `;

    const data = await Promise.all([
      billsSumByLabel,
    ]);

    const totalBillsFood = data[0].rows[0].food ?? 0;
    const totalBillsDinner = data[0].rows[0].dinner ?? 0;
    const totalBillsMisc = data[0].rows[0].misc ?? 0;

    return {
      totalBillsFood,
      totalBillsDinner,
      totalBillsMisc,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetchBillsData.');
  }
}

export async function fetchBillsPerMonth() {
  try {
    const data = await sql`
      SELECT
        DATE_TRUNC('month', date) AS month,
        DATE_TRUNC('year', date) AS year,
        label,
        SUM(value) AS total_value
      FROM bills
      WHERE label IN ('food', 'dinner')
        AND date >  CURRENT_DATE - INTERVAL '6 months'
      GROUP BY month, year, label
      ORDER BY
        month DESC, year DESC;
    `;

    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
    };
    const formatter = new Intl.DateTimeFormat('de-DE', options);
  
    return data.rows.map((row) => ({
      month: formatter.format(row.month),
      year: row.year.getFullYear(),
      label: row.label,
      total_value: +row.total_value / 100 ?? 0,
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetchBillsPerMonth.');
  }
}

export async function fetchBillsDiffPerUser() {
  try {
    const data = await sql`
      SELECT
        DATE_TRUNC('month', date) AS month,
        DATE_TRUNC('year', date) AS year,
        user_id,
        SUM(value) AS total_value
      FROM bills
      WHERE date >  CURRENT_DATE - INTERVAL '6 months'
      GROUP BY month, year, user_id
      ORDER BY
        month DESC, year DESC;
    `;
  
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
    };
    const formatter = new Intl.DateTimeFormat('de-DE', options);
  
    return data.rows.map((row) => ({
      month: formatter.format(row.month),
      year: row.year.getFullYear(),
      user_id: row.user_id,
      total_value: +row.total_value / 100 ?? 0,
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetchBillsDiffPerUser.');
  }
}

export async function fetchFilteredBills(
  year: number,
  month: number,
  currentPage: number,
  itemsPerPage: number = 10,
) {
  const offset = (currentPage - 1) * itemsPerPage;

  try {
    const bills = await sql<BillsTable>`
      SELECT
        bills.id,
        bills.user_id,
        users.name AS user_name,
        bills.title,
        bills.value,
        bills.label,
        bills.date,
        bills.created_at
      FROM bills
      JOIN users ON bills.user_id = users.id
      WHERE
        bills.date >= ${`${year}-${month}-01`}
        AND bills.date < ${`${year}-${(month+1)%12}-01`}
      ORDER BY bills.created_at DESC
      LIMIT ${itemsPerPage} OFFSET ${offset}
    `;

    return bills.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetchFilteredBills.');
  }
}
