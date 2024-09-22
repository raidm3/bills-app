
import { fetchRecipeById } from '@/app/lib/data-recipes';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import IngredientsList from '@/app/ui/recipies/ingredients-list';
import Link from "next/link";

export default async function Recipe({ params }: { params: { id: string } }) {
  const id = +params.id;

  const recipe = await fetchRecipeById(id);

  if (!recipe) {
    notFound();
  }

  const coverImage = recipe.coverImage ?? '/images/recipe-placeholder.webp';

  return (
    <div>
      <h1 className="text-xl font-semibold mb-2">
        {recipe.title}
      </h1>
      <Image
        className="mb-2 rounded-md"
        src={coverImage}
        alt={recipe.title}
        width={600}
        height={400}
      />
      <div className="flex justify-end my-3">
        <Link
          href={`/recipes/${recipe.id}/cooking`}
          className="text-primary p-2 font-medium"
        >
          Zur Zubereitung
        </Link>
      </div>
      <IngredientsList ingredients={recipe.ingredients} />
    </div>
  );
};
