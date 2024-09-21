'use client';

import Image from "next/image";
import Link from 'next/link';

export default function RecipiesList({ recipes }: { recipes: any[] }) {
  return (
    <div className="flex items-center justify-center">
      {recipes.length === 0 && (
        <span>Keine Rezepte gefunden</span>
      )}
      <div className="grid grid-cols-2 gap-4">
        {recipes.map((r) => (
          <Link
            key={r.id}
            href={`/dashboard/recipes/${r.id}/detail`}
            className="relative shadow-md p-2 rounded-md"
          >
            <h2 className="my-1 text-medium font-medium">{r.title}</h2>
            <Image
              src={r.coverImage ?? '/images/food-cover-mobile.webp' }
              alt={r.title}
              height={250}
              width={150}
              className="object-cover w-full h-32 rounded-md"
            />
            <div
              className="flex flex-wrap"
            >
              {r.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="font-medium text-xs bg-emerald-600 text-white rounded-full px-2 me-1 mt-1.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
