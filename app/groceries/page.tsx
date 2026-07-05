import GroceryListActions from '@/app/ui/groceries/list-actions';
import List from '@/app/ui/groceries/list';
import { Metadata } from 'next';
import { fetchGroceries } from '@/app/lib/data-groceries';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Groceries',
};

export default async function Page() {
  const groceries = await fetchGroceries();
  const categories = [
    { key: 'vegetables', label: 'Obst & Gemüse'},
    { key: 'meat', label: 'Fleisch & Fisch'},
    { key: 'basics', label: 'Basisprodukte'},
    { key: 'cooled', label: 'Kühlprodukte'},
    { key: 'other', label: 'Sonstiges'},
  ];
  const categorySet = new Set(groceries.map(item => item.category));
  const availableCategories = categories.filter(category => categorySet.has(category.key));
  const itemIds = groceries.filter((g) => g.done).map((g) => g.id);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-xl">Einkaufsliste</h1>
        <GroceryListActions itemIds={itemIds} />
      </div>
      <List groceries={groceries} categories={availableCategories} />
    </div>
  );
}
