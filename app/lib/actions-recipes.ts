'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const FormSchema = z.object({
  id: z.number(),
  title: z.string().min(1, { message: "Bitte einen Titel eingeben." }),
  category: z.enum(['vegetables', 'meat', 'basics', 'cooled', 'other'], {
    invalid_type_error: 'Bitte eine Kategorie auswählen.',
  }),
});

const CreateItem = FormSchema.omit({ id: true });

export async function createRecipe(prevState: any) {
  try {
    console.log('creating recipe');
  } catch (error) {
    return false;
  }

  revalidatePath('/groceries');
}