'use client';

import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import clsx from 'clsx';

export function CreateBill() {
  let pending = false;
  return (
    <Link
      href="/dashboard/bills/create"
      onClick={() => { pending = true; }}
      className={clsx(
        "flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
        {
          'bg-blue-200': pending,
        },
      )}
    >
      <span className="hidden md:block">Create Bill</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateBill({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/bills/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}
