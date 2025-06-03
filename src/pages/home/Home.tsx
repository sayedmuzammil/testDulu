import React from 'react';
import { ChefHat } from 'lucide-react';

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useRecipes } from '@/hooks/useRecipes';
import FilterSidebar from '@/components/FilterSidebar';
import RecipeCard from '@/components/layout/recipe/RecipeCard';

export default function RecipeApp() {
  const { recipes, loading, error } = useRecipes();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategories, setSelectedCategories] = React.useState<
    number[]
  >([]);
  const [selectedChefs, setSelectedChefs] = React.useState<number[]>(
    []
  );
  const [selectedIngredients, setSelectedIngredients] =
    React.useState<string[]>([]);

  const filteredRecipes = React.useMemo(() => {
    if (!recipes) return [];

    return recipes.filter((recipe) => {
      const matchesSearch =
        searchTerm.trim() === '' ||
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        (Array.isArray(recipe.categoryIds) &&
          recipe.categoryIds.some((catId) =>
            selectedCategories.includes(catId)
          ));

      const matchesChef =
        selectedChefs.length === 0 ||
        selectedChefs.includes(recipe.chefId);

      const matchesIngredients =
        selectedIngredients.length === 0 ||
        selectedIngredients.every((ingredient) =>
          recipe.ingredients.some(
            (ri) => ri.name.toLowerCase() === ingredient.toLowerCase()
          )
        );

      return (
        matchesSearch &&
        matchesCategory &&
        matchesChef &&
        matchesIngredients
      );
    });
  }, [
    recipes,
    searchTerm,
    selectedCategories,
    selectedChefs,
    selectedIngredients,
  ]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading recipes...</p>
        </div>
      </div>
    );
  }
  console.log(recipes);

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex">
          <FilterSidebar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedChefs={selectedChefs}
            setSelectedChefs={setSelectedChefs}
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
            recipes={recipes || []}
          />
          <SidebarInset className="flex-1">
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center gap-4 mb-6">
                <SidebarTrigger />
                <div>
                  <h2 className="text-3xl font-bold">
                    {filteredRecipes.length === recipes.length
                      ? 'All Recipes'
                      : `${filteredRecipes.length} Recipe${
                          filteredRecipes.length !== 1 ? 's' : ''
                        } Found`}
                  </h2>
                  {error && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {error}
                    </p>
                  )}
                </div>
              </div>

              {filteredRecipes.length === 0 ? (
                <div className="text-center py-12">
                  <ChefHat className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    No recipes found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              )}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
