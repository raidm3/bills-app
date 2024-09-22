
import { fetchRecipeById } from '@/app/lib/data-recipes';
import { notFound } from 'next/navigation';
import parse from 'html-react-parser';
import { MinusIcon } from '@heroicons/react/24/outline';

export default async function Recipe({ params }: { params: { id: string } }) {
  const id = +params.id;

  const recipe = await fetchRecipeById(id);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="mb-3">
      <div className="mb-4">
        <h1 className="text-xl font-semibold">
          {recipe.title}
        </h1>
        {recipe.link && (
          <a
            href={recipe.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary py-2 font-medium"
          >
            Online Rezept
          </a>
        )}
      </div>
      <hr />
      <h2 className="font-medium text-lg mt-4">Zutaten</h2>
      <ul className="mb-4">
        {recipe.ingredients.map((ingredient) => (
          <div
            key={ingredient.id}
            className="block"
          >
            <MinusIcon className="w-4 inline me-1" /> 
            <li className="inline">{ingredient.title}</li>
          </div>
        ))}
      </ul>
      <hr />
      <div className="mt-4">
        <h2 className="font-medium text-lg">Zubereitung</h2>
        <p>{parse(recipe.description ?? '')}</p>
      </div>
    </div>
  );
};
