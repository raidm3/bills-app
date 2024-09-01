'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: "Bitte einen Titel eingeben." }),
  userId: z.string({
    invalid_type_error: 'Bitte eine Person auswählen.',
  }),
  value: z.coerce
    .number()
    .gt(0, { message: 'Bitte eine Zahl größer 0€ eingeben.' }),
  label: z.enum(['food', 'dinner', 'misc'], {
    invalid_type_error: 'Bitte eine Kategorie auswählen.',
  }),
  date: z.string(),
});

const CreateBill = FormSchema.omit({ id: true, date: true });

const UpdateBill = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    title?: string[];
    userId?: string[];
    value?: string[];
    label?: string[];
  };
  message?: string | null;
}

export async function createBill(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateBill.safeParse({
    title: formData.get('title'),
    userId: formData.get('userId'),
    value: formData.get('value'),
    label: formData.get('label'),
  });
 
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Bill.',
    };
  }
 
  // Prepare data for insertion into the database
  const { userId, title, value, label } = validatedFields.data;
  const valueInCents = value * 100;
  const date = new Date().toISOString().split('T')[0];
 
  // Insert data into the database
  try {
    await sql`
      INSERT INTO bills (user_id, title, value, label, date, created_at)
      VALUES (${userId}, ${title}, ${valueInCents}, ${label}, ${date}, NOW())
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Bill.',
    };
  }
 
  revalidatePath('/dashboard/bills');
  redirect('/dashboard/bills');
}

export async function updateBill(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateBill.safeParse({
    title: formData.get('title'),
    userId: formData.get('userId'),
    value: formData.get('value'),
    label: formData.get('label'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Bill.',
    };
  }

  const { userId, title, value, label } = validatedFields.data;
  const valueInCents = value * 100;

  try {
    await sql`
      UPDATE bills
      SET user_id = ${userId}, title = ${title}, value = ${valueInCents}, label = ${label}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Bill.' };
  }

  revalidatePath('/dashboard/bills');
  revalidatePath('/dashboard/bills/(bill)/[id]/edit', 'page');
  redirect('/dashboard/bills');
}

export async function deleteBill(id: string) {
  try {
    await sql`DELETE FROM bills WHERE id = ${id}`;
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Bill.' };
  }
  revalidatePath('/dashboard/bills');
  redirect('/dashboard/bills');
}