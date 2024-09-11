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

export async function fetchRecipeById(id: string) {
  return {
    id: '2',
    title: 'Erdnuss Curry',
    coverImage: '/images/erdnuss-curry.jpg',
    ingredients: [
      'Knoblauchzehe 2x',
      'Karotte 1x',
      'Zucchini 1x',
      'Paprika 1x',
      'Brokkoli 0,5x',
      'Hähnchen 400g',
      'Reis 200g',
    ],
    link: 'https://www.eatbetter.de/rezepte/erdnuss-curry-cremig-lecker',
    description: `Den Speck bzw. Schinken nicht zu fein würfeln. In Olivenöl glasig anschwitzen. Beiseitestellen. Die Pasta in reichlich Salzwasser al dente kochen - auf keinen Fall weich, da die Pasta später noch etwas nachkocht. Gegen Ende der Kochzeit etwas Kochwasser (1 - 2 Espressotässchen) auffangen oder einfach abschöpfen.<br/><br/>Währenddessen die Eier mit den beiden Käsesorten verquirlen. Leicht salzen, schwarzen Pfeffer nach Geschmack mahlen und zufügen.<br/><br/>Den Speck bzw. Schinken erneut erhitzen. Aufgefangenes Kochwasser hinzufügen und aufkochen lassen. Die Pasta zufügen, verrühren. Eier-Käse-Mischung zufügen. Leicht stocken lassen und gut rühren, damit die Mischung die Pasta zärtlich umhüllt.`,
    images: [],
    tags: [
      'Reis',
      'Fleisch',
    ],
  };
}
