'use client';

import clsx from "clsx";
import { useState } from "react";
import { addIngredientsToGroceryList } from "@/app/lib/actions-groceries";
import { Ingredient } from "@/app/lib/definitions";
import Image from 'next/image';


export default function IngredientsList({ ingredients }: { ingredients: Ingredient[] }) {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleclick = (ingredient: Ingredient) => {
    if (! selectedIngredients.find((i) => i.id === ingredient.id)) {
      setSelectedIngredients([
        ...selectedIngredients,
        ingredient,
      ]);
    } else {
      setSelectedIngredients(selectedIngredients.filter((ing) => ing.id !== ingredient.id));
    }
  };

  const addIngredients = async () => {
    if (selectedIngredients.length > 0) {
      setLoading(true);
      await addIngredientsToGroceryList(selectedIngredients);
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <h3 className="font-medium text-gray-600 mb-2">Zutaten auswählen:</h3>
      <ul className="flex flex-wrap mb-3">
        {ingredients.map((ingredient) => (
          <li
            key={ingredient.id}
            className="me-1.5 mb-1.5"
          >
            <button
              className={clsx(
                'rounded-md bg-white border-2 border-gray-100 px-2 py-1 text-sm font-medium text-gray-600 transition-colors',
                {
                  '!bg-success !border-success !text-white': selectedIngredients.includes(ingredient),
                },
              )}
              value={ingredient.title}
              onClick={() => handleclick(ingredient)}
            >
              {ingredient.title}
            </button>
          </li>
        ))}
      </ul>
      <button
        className="flex items-center justify-center rounded-md bg-primary p-2 h-10 text-center font-semibold text-white w-full disabled:bg-blue-300"
        onClick={() => addIngredients()}
        disabled={selectedIngredients.length === 0}
      >
        {isLoading ? (
          <Image src="/icons/loading-dots-white.svg" alt="Loading" width={24} height={24} />
        ) : (
          <span>{selectedIngredients.length + ' Zutaten hinzufügen'}</span>
        )}
      </button>
    </div>
  );
}