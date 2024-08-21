'use client';

import { UserField } from '@/app/lib/definitions';
import {
  DocumentTextIcon,
  CurrencyEuroIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { UpdateBill } from './buttons';
import { createBill, State } from '@/app/lib/actions-bills';
import { useFormState } from 'react-dom';

export default function CreateBillForm({
  users,
}: {
  users: UserField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useFormState(createBill, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Bill Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <div className="relative">
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter a title"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p className="mt-2 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Bill User */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            User
          </label>
          <div className="relative">
            <select
              id="customer"
              name="userId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            >
              <option value="" disabled>
                Select a user
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.userId &&
              state.errors.userId.map((error: string) => (
                <p className="mt-2 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Bill Value */}
        <div className="mb-4">
          <label htmlFor="value" className="mb-2 block text-sm font-medium">
            Value
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="value"
                name="value"
                type="number"
                step="0.01"
                placeholder="Enter € value"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyEuroIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="value-error" aria-live="polite" aria-atomic="true">
            {state.errors?.value &&
              state.errors.value.map((error: string) => (
                <p className="mt-2 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Bill Label */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Label
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <input
                  id="food"
                  name="label"
                  type="radio"
                  value="food"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="food"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  <Image
                    src="/icons/shopping-cart.svg"
                    width={16}
                    height={16}
                    alt="shopping cart"
                  />
                  Lebensmittel
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="dinner"
                  name="label"
                  type="radio"
                  value="dinner"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="dinner"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  <Image
                    src="/icons/romantic-dinner.svg"
                    width={16}
                    height={16}
                    alt="dinner"
                  />
                  Essen gehen
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="misc"
                  name="label"
                  type="radio"
                  value="misc"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="misc"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >

                  <Image
                    src="/icons/coins-stacked.svg"
                    width={16}
                    height={16}
                    alt="misc"
                  />
                  Sonstiges
                </label>
              </div>
            </div>
            <div id="status-error" aria-live="polite" aria-atomic="true">
              {state.errors?.label &&
                state.errors.label.map((error: string) => (
                  <p className="mt-2 text-xs text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-2 flex justify-end gap-4">
        <Link
          href="/dashboard/bills"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
