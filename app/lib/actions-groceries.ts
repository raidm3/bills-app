'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import prisma from '@/app/lib/prisma';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.number(),
  title: z.string().min(1, { message: "Bitte einen Titel eingeben." }),
  category: z.enum(['vegetables', 'meat', 'basics', 'cooled', 'other'], {
    invalid_type_error: 'Bitte eine Kategorie auswählen.',
  }),
  navigation: z.enum(['list', 'create']),
});

export type State = {
  errors?: {
    title?: string[];
    category?: string[];
  };
  message?: string | null;
  resetKey?: number;
}

const CreateItem = FormSchema.omit({ id: true });

export async function deleteManyGroceryItems(ids: number[]) {
  try {
    await prisma.groceries.deleteMany({
      where: {
        id: { in: ids },
        favorite: false,
      },
    });
  } catch (error) {
    return false;
  }

  revalidatePath('/dashboard/groceries');
}

export async function createGroceryItem(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateItem.safeParse({
    title: formData.get('title'),
    category: formData.get('category'),
    navigation: formData.get('navigation'),
  });
 
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Grocery Item.',
      resetKey: prevState?.resetKey,
    };
  }

  // Prepare data for insertion into the database
  const { title, category, navigation } = validatedFields.data;
  let res;
 
  // Insert data into the database
  try {
    res = await prisma.groceries.create({
      data: {
        title,
        category,
        done: false,
      },
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Grocery Item.',
      resetKey: prevState?.resetKey,
    };
  }
 
  if (navigation === 'list') {
    revalidatePath('/dashboard/groceries');
    redirect('/dashboard/groceries');
  }

  return {
    message: 'Grocery Item Created Successfully.',
    resetKey: res.id,
  }
}

const cleanObject = (obj: {}) => {
  const filteredEntries = Object.entries(obj).filter(([key, value]) => value !== undefined);
  return Object.fromEntries(filteredEntries);
};

export async function updateGroceryItem({itemId, done, favorite}: {
  itemId: number,
  done?: boolean,
  favorite?: boolean,
}) {
  const data = cleanObject({ done, favorite });
  await prisma.groceries.update({
    where: { id: itemId },
    data,
  });

  revalidatePath('/dashboard/groceries');
}

export async function deleteGroceryItem(itemId: number) {
  await prisma.groceries.delete({ where: { id: itemId } });
  revalidatePath('/dashboard/groceries');
}
