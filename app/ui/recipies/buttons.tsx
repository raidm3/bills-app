'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import clsx from 'clsx';

export function CreateRecipeItem() {
  let pending = false;
  return (
    <div className="fixed bottom-16 right-4 z-50">
      <Link
        href="/recipes/create"
        onClick={() => { pending = true; }}
        className={clsx(
          "flex items-center rounded-full bg-primary p-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
          {
            'bg-blue-200': pending,
          },
        )}
      >
        <span className="hidden md:block">Create Recipe</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    </div>
  );
}

