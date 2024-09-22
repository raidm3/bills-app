'use client';

import Link from 'next/link';
import { createRecipe } from '@/app/lib/actions-recipes';
import { useState, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Image from 'next/image';
import { PlusIcon } from '@heroicons/react/24/outline';

function Submit() {
  const { pending } = useFormStatus();
  const isDisabled = pending;
  return (
    <button
      className="flex h-10 min-w-26 items-center rounded-lg px-4 text-sm font-medium text-white bg-success disabled:bg-green-300"
      type="submit"
      disabled={isDisabled}
    >
      { pending ? (<Image src="/icons/loading-dots.svg" alt="" width={24} height={24} />) : 'Speichern' }
    </button>
  )
}

export default function CreateRecipeForm() {
  const tagInput = useRef<any>(null);
  const createForm = useRef<any>(null);

  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>('');

  const initialState = '';
  // const [state, formAction] = useFormState(createRecipe, initialState);

  const addTag = (e: any) => {
    e.preventDefault();

    setTags((prev) => [...prev, tag]);
    setTag('');

    if (tagInput.current) {
      tagInput.current.focus();
    }
  };

  return (
    <form ref={createForm}>
      <div className="flex justify-center min-h-[100%]">
        <div className="rounded-md bg-gray-50 p-4 md:p-6 w-full">
          <h1 className="text-xl mt-0 mb-4">
            Neues Rezept
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
          <div className="mb-2">
            <label htmlFor="item" className="mb-2 block text-sm font-medium text-gray-700">
              Link
            </label>
            <div className="relative max-w-md">
              <input
                id="link"
                name="link"
                type="url"
                placeholder="Link eingeben"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="item" className="mb-2 block text-sm font-medium text-gray-700">
              Beschreibung
            </label>
            <div className="relative max-w-md">
              <textarea
                id="description"
                name="description"
                rows={8}
                placeholder="Description eingeben"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              ></textarea>
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="item" className="mb-2 block text-sm font-medium text-gray-700">
              Tags
            </label>
            <div className="flex">
              <input
                id="tags"
                ref={tagInput}
                name="tags"
                type="text"
                value={tag}
                placeholder="Tag eingeben"
                onChange={(e) => setTag(e.target.value)}
                className="grow-1 me-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <button
                className="flex items-center rounded-lg bg-primary py-2 px-4 text-sm font-medium text-white"
                onClick={(e) => addTag(e)}
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap mt-1">
              {tags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="font-normal text-xs py-1 px-2 m-1 bg-gray-200 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <p className="text-xs text-red-500">
            {/* {state} */}
          </p>
          <div className="mt-4 flex justify-end gap-4">
            <Link
              href="/recipes"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Zurück
            </Link>
            <Submit />
          </div>
        </div>
      </div>
    </form>
  );
}
