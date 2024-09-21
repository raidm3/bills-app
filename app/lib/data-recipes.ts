import prisma from '@/app/lib/prisma';
import { RecipeDB, Ingredient } from '@/app/lib/definitions'

function formatRecipes(recipes: RecipeDB[]) {
  return recipes.map((recipe: RecipeDB) => ({
    ...recipe,
    tags: recipe?.tags?.split(',') || null,
  }));
}

function formatRecipe(recipe: RecipeDB | null, ingredients: Ingredient[] = []) {
  if (!recipe) return null;
  return {
    ...recipe,
    tags: recipe?.tags?.split(',') || null,
    ingredients: ingredients.map((ingredient) => ({
      id: ingredient.id,
      title: ingredient.title,
      category: ingredient.category,
    })),
  }
}

export async function fetchAllRecipes(query: string) {
  try {
    const response = await prisma.recipes.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { tags: { contains: query, mode: 'insensitive' } },
        ]
      },
      orderBy: { created_at: 'asc' },
    });

    return formatRecipes(response);
  } catch (error) {
    console.log('Error fetching recipes:', error);
  }
}

export async function fetchRecipeById(id: number) {
  try {
    const recipe = await prisma.recipes.findUnique({
      where: { id },
    });

    if (!recipe) {
      return null;
    }

    const ingredients = await prisma.ingredients.findMany({
      where: { recipeId: id },
    });

    return formatRecipe(recipe, ingredients);
  } catch (error) {
    console.log('Error fetching recipe:', error);
  }
}


// try {
  //   const res = await prisma.recipes.create({
  //     data: {
  //       title: 'Kaiserschmarrn',
  //       coverImage: '/images/wiener-kaiserschmarrn-mobile.webp',
  //       ingredients: 'Mehl 200g,Milch 300ml,Zucker 30g,Eier 4x,Butter 40g,Rosinen 30g',
  //       link: 'https://www.gutekueche.at/wiener-kaiserschmarrn-rezept-847',
  //       description: `Für diesen köstlichen Kaiserschmarrn zuerst in einer Schüssel Mehl, Zucker, Salz und Dotter mit der Milch zu einem glatten, dickflüssigen Teig verrühren. In einer anderen Schüssel die Eiklar zu einem steifen Schnee schlagen und danach unter den dickflüssigen Teig heben. Die Butter in einer großen, flachen Pfanne (Ø 22-24 cm) aufschäumen lassen, sodass es sehr heiß ist, den Teig langsam eingießen und mit Hilfe eines Pfannenwenders beidseitig anbacken. Anschließend die Pfanne in ein vorgeheiztes Backrohr bei mäßiger Hitze (Heißluft ca. 180°C) für 10-12 Min. fertig backen - bis der Kaiserschmarren leicht goldbraun ist. Danach die Pfanne aus dem Backrohr nehmen und den fertigen Teig mit zwei Löffeln in unregelmäßige Stücke zerreißen. Nun die Rosinen hinzufügen, gut verrühren und die Pfanne nochmals für ca. 1 Minute in den noch heißen Backofen geben. Den Schmarren auf Tellern anrichten, mit Staubzucker bestreuen und mit beliebigem Kompott oder auch Apfelmus servieren.`,
  //       images: null,
  //       tags: 'Nachspeise,Süß',
  //     },
  //   });
  // } catch (error) {
  // }