'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import prisma from '@/app/lib/prisma';
import { redirect } from 'next/navigation';
import { Grocery } from '@/app/lib/definitions';

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

const CreateItem = FormSchema.omit({ id: true, navigation: true });

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

export async function createGroceryItems(items: Grocery[], prevState: any, formData: FormData) {
  const data = items.map((item) => {
    const validated = CreateItem.safeParse({
      title: item.title,
      category: item.category,
    });
    return validated.success ? validated.data : null;
  }).filter(Boolean);

  if (! data.length) {
    return 'Validierung fehlgeschlagen.';
  }

  let res;
  try {
    res = await prisma.groceries.createMany({
      data: items,
    });
  } catch (error) {
    return 'Database Error: Failed to Create Grocery Item.';
  }

  if (res) {
    revalidatePath('/dashboard/groceries');
    redirect('/dashboard/groceries');
  }

  return 'Grocery Items Created Successfully.';
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

export async function addIngredientsToGroceryList(ingredients: string[]) {
  console.log('Adding ingredients:', ingredients);

  const data = ingredients.map((ingredient) => ({
    title: ingredient,
    category: 'other',
    done: false,
  }));

  try {
    await prisma.groceries.createMany({
      data,
    });
  } catch (error) {
    console.log('Error adding ingredients:', error);
  }

  revalidatePath('/dashboard/groceries');
  redirect('/dashboard/recipes');
}
