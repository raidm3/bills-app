'use client';

import Link from 'next/link';
import { createGroceryItems } from '@/app/lib/actions-groceries';
import { useState, useRef } from 'react';
import { Grocery } from '@/app/lib/definitions';
import { useFormState, useFormStatus } from 'react-dom';
import Image from 'next/image';

function Submit({ title, category }: { title: string, category: string  }) {
  const { pending } = useFormStatus();
  return (
    <button
      className="flex h-10 min-w-26 items-center rounded-lg px-4 text-sm font-medium text-white bg-success disabled:bg-green-300"
      type="submit"
      disabled={title === '' || category === '' || pending}
    >
      { pending ? (<Image src="/icons/loading-dots.svg" alt="" width={24} height={24} />) : 'Speichern' }
    </button>
  )
}

export default function CreateGroceryItemForm() {
  const createForm = useRef<any>(null);
  const titleInput = useRef<any>(null);

  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [groceries, setGroceries] = useState<Grocery[]>([]);

  const initialState = '';
  const createItems = createGroceryItems.bind(null, [...groceries, { title, category }]);
  const [state, formAction] = useFormState(createItems, initialState);

  const resetForm = (e: any) => {
    e.preventDefault();

    if (title.length > 0 && category.length > 0) {
      setGroceries((prev) => [...prev, { title, category }]);
    }

    if (createForm.current) {
      createForm.current.reset();
    }
    if (titleInput.current) {
      titleInput.current.focus();
    }
  };

  return (
    <form action={formAction} ref={createForm}>
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
                ref={titleInput}
                name="title"
                type="text"
                placeholder="Titel eingeben"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                autoFocus
                autoCapitalize="on"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
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
                    onChange={(e) => setCategory(e.target.value)}
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
                    onChange={(e) => setCategory(e.target.value)}
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
                    onChange={(e) => setCategory(e.target.value)}
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
                    onChange={(e) => setCategory(e.target.value)}
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
                    onChange={(e) => setCategory(e.target.value)}
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
          <p className="text-xs text-red-500">
            {state}
          </p>
          <div className="mt-4 flex justify-end gap-4">
            <Link
              href="/dashboard/groceries"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Zurück
            </Link>
            <Submit title={title} category={category} />
            <button
              className="flex h-10 items-center rounded-lg px-4 text-sm font-medium text-white bg-primary disabled:bg-blue-300"
              onClick={(e) => resetForm(e)}
              disabled={title === '' || category === ''}
            >
              Nächste
            </button>
          </div>
          <div className="flex justify-end mt-3">
          </div>
        </div>
      </div>
    </form>
  );
}
