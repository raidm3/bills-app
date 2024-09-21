'use client';

import clsx from "clsx";
import { useState } from "react";
import { addIngredientsToGroceryList } from "@/app/lib/actions-groceries";
import { Ingredient } from "@/app/lib/definitions";


export default function IngredientsList({ ingredients }: { ingredients: Ingredient[] }) {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);

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
      await addIngredientsToGroceryList(selectedIngredients);
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
      <div className="flex items-center justify-center">
        <button
          className="rounded-md bg-primary p-2 font-semibold text-white w-full"
          onClick={() => addIngredients()}
        >
          {selectedIngredients.length} Zutaten hinzufügen
        </button>
      </div>
    </div>
  );
}