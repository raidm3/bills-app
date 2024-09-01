'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createGroceryItem, State } from '@/app/lib/actions-groceries';
import { useFormState } from 'react-dom';

export default function CreateGroceryItemForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useFormState(createGroceryItem, initialState);

  return (
    <form action={formAction} key={state?.resetKey}>
      <div className="flex justify-center min-h-[100%]">
        <div className="rounded-md bg-gray-50 p-4 md:p-6 w-full">
          <h1 className="text-xl mt-0 mb-4">
            Neues Item
          </h1>
          <div className="mb-2">
            <label htmlFor="item" className="mb-2 block text-sm font-medium text-gray-700">
              Titel
            </label>
            <div className="relative max-w-md">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Titel eingeben"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                autoFocus
                autoCapitalize="on"
              />
            </div>
          </div>
          <div id="title-error" aria-live="polite" aria-atomic="true" className="mb-2">
            {state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p className="text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <fieldset className="mb-2">
            <legend className="mb-2 block text-sm font-medium text-gray-700">
              Kategorie
            </legend>
            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <input
                    id="vegetables"
                    name="category"
                    type="radio"
                    value="vegetables"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="vegetables"
                    className="w-full ml-2 flex cursor-pointer gap-1.5 items-center rounded-full px-3 py-1 text-sm font-medium text-gray-600 active:bg-gray-100"
                  >
                    Obst & Gemüse
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="meat"
                    name="category"
                    type="radio"
                    value="meat"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="meat"
                    className="w-full ml-2 flex cursor-pointer gap-1.5 items-center rounded-full px-3 py-1 text-sm font-medium text-gray-600 active:bg-gray-100"
                  >
                    Fleisch & Fisch
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="basics"
                    name="category"
                    type="radio"
                    value="basics"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="basics"
                    className="w-full ml-2 flex cursor-pointer gap-1.5 items-center rounded-full px-3 py-1 text-sm font-medium text-gray-600 active:bg-gray-100"
                  >
                    Basisprodukte
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="cooled"
                    name="category"
                    type="radio"
                    value="cooled"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="cooled"
                    className="w-full ml-2 flex cursor-pointer gap-1.5 items-center rounded-full px-3 py-1 text-sm font-medium text-gray-600 active:bg-gray-100"
                  >
                    Kühlprodukte
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="other"
                    name="category"
                    type="radio"
                    value="other"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="other"
                    className="w-full ml-2 flex cursor-pointer gap-1.5 items-center rounded-full px-3 py-1 text-sm font-medium text-gray-600 active:bg-gray-100"
                  >
                    Sonstiges
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
          <div id="category-error" aria-live="polite" aria-atomic="true" className="mb-2">
            {state.errors?.category &&
              state.errors.category.map((error: string) => (
                <p className="text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <div className="mt-4 flex justify-end gap-4">
            <Link
              href="/dashboard/groceries"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Zurück
            </Link>
            <Button
              className="bg-success disabled:bg-zinc-400"
              type="submit"
              name="navigation"
              value="list"
            >
              Speichern
            </Button>
            <Button
              className="bg-primary disabled:bg-zinc-400"
              type="submit"
              name="navigation"
              value="create"
            >
              Nächste
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
