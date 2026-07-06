import prisma from '@/app/lib/prisma';
import { unstable_cache } from 'next/cache';

export const fetchGroceries = unstable_cache(async () => {
  return prisma.groceries.findMany({
    select: { id: true, title: true, category: true, done: true, favorite: true, created_at: true },
    orderBy: { id: 'asc' },
  });
}, ['fetchGroceries'], { tags: ['groceries'], revalidate: 3600 });
