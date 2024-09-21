import prisma from '@/app/lib/prisma';
import { LoadingSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import RecipiesList from '@/app/ui/recipies/list';
import SearchBar from '@/app/ui/recipies/search';
import { fetchAllRecipes } from '@/app/lib/data-recipes';

export default async function Page({
  searchParams
}: {
  searchParams?: {
    query?: string;
  }
}) {
  const query = searchParams?.query || '';

  
  const recipes = await fetchAllRecipes(query) || [];

  return (
    <div>
      <h1 className="mb-2 text-xl hidden block:md">Recipes</h1>
      <SearchBar />
      <Suspense fallback={<LoadingSkeleton />}>
        <RecipiesList recipes={recipes} />
      </Suspense>
    </div>
  );
}
