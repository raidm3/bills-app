import prisma from '@/app/lib/prisma';
import { LoadingSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import RecipiesList from '@/app/ui/recipies/list';
import SearchBar from '@/app/ui/recipies/search';

export default async function Page({
  searchParams
}: {
  searchParams?: {
    query?: string;
  }
}) {
  // await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate network delay
  const query = searchParams?.query || '';
  const recipes = [
    {
      id: '1',
      title: 'Spaghetti Carbonara',
      coverImage: '/images/spaghetti-carbonara.jpg',
      ingredients: [
        'Spaghetti 250g',
        'Speck 100g',
        'Reibekäse',
        'Eier 2Stk',
      ],
      link: 'https://www.chefkoch.de/rezepte/1298241234947062/Carbonara-wie-bei-der-Mamma-in-Rom.html',
      description: `Den Speck bzw. Schinken nicht zu fein würfeln. In Olivenöl glasig anschwitzen. Beiseitestellen. Die Pasta in reichlich Salzwasser al dente kochen - auf keinen Fall weich, da die Pasta später noch etwas nachkocht. Gegen Ende der Kochzeit etwas Kochwasser (1 - 2 Espressotässchen) auffangen oder einfach abschöpfen.\n\nWährenddessen die Eier mit den beiden Käsesorten verquirlen. Leicht salzen, schwarzen Pfeffer nach Geschmack mahlen und zufügen.\n\nDen Speck bzw. Schinken erneut erhitzen. Aufgefangenes Kochwasser hinzufügen und aufkochen lassen. Die Pasta zufügen, verrühren. Eier-Käse-Mischung zufügen. Leicht stocken lassen und gut rühren, damit die Mischung die Pasta zärtlich umhüllt.`,
      images: [
        '/images/spaghetti-carbonara-1.jpg',
        '/images/spaghetti-carbonara-2.jpg',
      ],
      tags: [
        'Italienisch',
        'Nudeln',
        'Fleisch',
      ],
    },
    {
      id: '2',
      title: 'Erdnuss Curry',
      coverImage: '/images/erdnuss-curry.jpg',
      ingredients: [
        'Knoblauchzehe 2x',
        'Karotte 1x',
        'Zucchini 1x',
        'Paprika 1x',
        'Brokkoli 0,5x',
        'Hähnchen 400g',
        'Reis 200g',
      ],
      link: 'https://www.eatbetter.de/rezepte/erdnuss-curry-cremig-lecker',
      description: `Den Speck bzw. Schinken nicht zu fein würfeln. In Olivenöl glasig anschwitzen. Beiseitestellen. Die Pasta in reichlich Salzwasser al dente kochen - auf keinen Fall weich, da die Pasta später noch etwas nachkocht. Gegen Ende der Kochzeit etwas Kochwasser (1 - 2 Espressotässchen) auffangen oder einfach abschöpfen.\n\nWährenddessen die Eier mit den beiden Käsesorten verquirlen. Leicht salzen, schwarzen Pfeffer nach Geschmack mahlen und zufügen.\n\nDen Speck bzw. Schinken erneut erhitzen. Aufgefangenes Kochwasser hinzufügen und aufkochen lassen. Die Pasta zufügen, verrühren. Eier-Käse-Mischung zufügen. Leicht stocken lassen und gut rühren, damit die Mischung die Pasta zärtlich umhüllt.`,
      images: [],
      tags: [
        'Reis',
        'Fleisch',
      ],
    },
    {
      id: '3',
      title: 'Chicken Burger',
      coverImage: '/images/crispy-chicken-burger.jpg',
      ingredients: [
        'Burger Buns 2x',
        'Chicken Breast 2x',
        'Salat',
        'Zwiebeln',
        'Preiselbeeren',
      ],
      link: 'https://www.chefkoch.de/rezepte/3329761494357421/Crispy-Chicken-Burger.html',
      description: 'So wird es gemacht!',
      images: [],
      tags: [
        'Fleisch',
      ],
    },
    {
      id: '4',
      title: 'Kaiserschmarrn',
      coverImage: '/images/wiener-kaiserschmarrn.jpg',
      ingredients: [
        'Mehl 200g',
        'Milch 300ml',
        'Zucker 30g',
        'Eier 4x',
        'Butter 40g',
        'Rosinen 30g'
      ],
      link: 'https://www.gutekueche.at/wiener-kaiserschmarrn-rezept-847',
      description: `Für diesen köstlichen Kaiserschmarrn zuerst in einer Schüssel Mehl, Zucker, Salz und Dotter mit der Milch zu einem glatten, dickflüssigen Teig verrühren.<br /><br />In einer anderen Schüssel die Eiklar zu einem steifen Schnee schlagen und danach unter den dickflüssigen Teig heben.<br /><br /<br /><br />Die Butter in einer großen, flachen Pfanne (Ø 22-24 cm) aufschäumen lassen, sodass es sehr heiß ist, den Teig langsam eingießen und mit Hilfe eines Pfannenwenders beidseitig anbacken.<br /><br />Anschließend die Pfanne in ein vorgeheiztes Backrohr bei mäßiger Hitze (Heißluft ca. 180°C) für 10-12 Min. fertig backen - bis der Kaiserschmarren leicht goldbraun ist.<br /><br />Danach die Pfanne aus dem Backrohr nehmen und den fertigen Teig mit zwei Löffeln in unregelmäßige Stücke zerreißen.<br /><br />Nun die Rosinen hinzufügen, gut verrühren und die Pfanne nochmals für ca. 1 Minute in den noch heißen Backofen geben.<br /><br />Den Schmarren auf Tellern anrichten, mit Staubzucker bestreuen und mit beliebigem Kompott oder auch Apfelmus servieren.`,
      images: [],
      tags: [
        'Nachspeise',
        'Süß',
      ],
    },
  ];
  const filteredRecipes = recipes.filter((recipe) => {
    if (!query) return true;
    return recipe.title.toLowerCase().includes(query);
  });

  return (
    <div>
      <h1 className="mb-2 text-xl hidden block:md">Recipes</h1>
      <SearchBar />
      <Suspense fallback={<LoadingSkeleton />}>
        <RecipiesList recipes={filteredRecipes} />
      </Suspense>
    </div>
  );
}
