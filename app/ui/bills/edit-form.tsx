'use client';

import { UserField, BillForm } from '@/app/lib/definitions';
import { TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateBill, deleteBill, State } from '@/app/lib/actions-bills';
import { useFormState } from 'react-dom';

export default function EditBillForm({
  bill,
  users,
}: {
  bill: BillForm;
  users: UserField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updateBillWithId = updateBill.bind(null, bill.id);
  const [state, formAction] = useFormState(updateBillWithId, initialState);
  const deleteBillWithId = deleteBill.bind(null);

  return (
    <div>

      <form action={formAction}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* Bill Title */}
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
              Titel
            </label>
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                defaultValue={bill.title}
                placeholder="Enter a title"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
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
            <label htmlFor="customer" className="mb-2 block text-sm font-medium text-gray-700">
              Person
            </label>
            <div className="relative">
              <select
                id="customer"
                name="userId"
                className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                defaultValue={bill.user_id}
              >
                <option value="" disabled>
                  Bitte eine Person auswählen
                </option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
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
            <label htmlFor="value" className="mb-2 block text-sm font-medium text-gray-700">
              Wert
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="value"
                  name="value"
                  type="number"
                  step="0.01"
                  defaultValue={bill.value}
                  placeholder="Enter € value"
                  className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
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
            <legend className="mb-2 block text-sm font-medium text-gray-700">
              Kategorie
            </legend>
            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <input
                    id="food"
                    name="label"
                    type="radio"
                    value="food"
                    defaultChecked={bill.label === 'food'}
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
                    defaultChecked={bill.label === 'dinner'}
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
                    defaultChecked={bill.label === 'misc'}
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
        <div className="flex justify-between mt-2">
          <button
            onClick={async (e) => {
              e.preventDefault();
              await deleteBillWithId(bill.id);
            }}
            className="flex items-center rounded-md p-2 bg-red-600 text-white text-sm"
          >
            <div className="w-4">
              <TrashIcon />
            </div>
            <span className="ms-1">Löschen</span>
          </button>
          <div className="flex justify-end gap-4">
            <Link
              href="/dashboard/bills"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Zurück
            </Link>
            <Button type="submit">Speichern</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
