import * as React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Checkbox } from '@/components/ui/checkbox';
import type { Recipe } from './types/recipes';
import dummyCategories from '@/data/dummyCategories';
import dummyChefs from '@/data/dummyChefs';

function FilterSidebar({
  searchTerm,
  setSearchTerm,
  selectedCategories,
  setSelectedCategories,
  selectedChefs,
  setSelectedChefs,
  selectedIngredients,
  setSelectedIngredients,
  recipes,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategories: number[];
  setSelectedCategories: (categories: number[]) => void;
  selectedChefs: number[];
  setSelectedChefs: (chefs: number[]) => void;
  selectedIngredients: string[];
  setSelectedIngredients: (ingredients: string[]) => void;
  recipes: Recipe[];
}) {
  const [ingredientSearch, setIngredientSearch] = React.useState('');

  // Get unique ingredients from all recipes with proper null checks
  const allIngredients = React.useMemo(() => {
    if (!recipes || !Array.isArray(recipes)) {
      return [];
    }

    const ingredientSet = new Set<string>();
    recipes.forEach((recipe) => {
      if (
        recipe &&
        recipe.ingredients &&
        Array.isArray(recipe.ingredients)
      ) {
        recipe.ingredients.forEach((ingredient) => {
          if (ingredient && ingredient.name) {
            ingredientSet.add(ingredient.name.toLowerCase());
          }
        });
      }
    });
    return Array.from(ingredientSet).sort();
  }, [recipes]);

  // Filter ingredients based on search
  const filteredIngredients = React.useMemo(() => {
    if (!ingredientSearch) return allIngredients;
    return allIngredients.filter((ingredient) =>
      ingredient
        .toLowerCase()
        .includes(ingredientSearch.toLowerCase())
    );
  }, [allIngredients, ingredientSearch]);

  const handleCategoryChange = (
    categoryId: number,
    checked: boolean
  ) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    }
  };

  const handleChefChange = (chefId: number, checked: boolean) => {
    if (checked) {
      setSelectedChefs([...selectedChefs, chefId]);
    } else {
      setSelectedChefs(selectedChefs.filter((id) => id !== chefId));
    }
  };

  const handleIngredientChange = (
    ingredient: string,
    checked: boolean
  ) => {
    if (checked) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    } else {
      setSelectedIngredients(
        selectedIngredients.filter((ing) => ing !== ingredient)
      );
    }
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedChefs([]);
    setSelectedIngredients([]);
    setIngredientSearch('');
  };

  const hasActiveFilters =
    searchTerm ||
    selectedCategories.length > 0 ||
    selectedChefs.length > 0 ||
    selectedIngredients.length > 0;

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </h2>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
            >
              <X className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* Search */}
        <SidebarGroup>
          <SidebarGroupLabel>Search Recipes</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Categories */}
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dummyCategories.map((category) => (
                <SidebarMenuItem key={category.id}>
                  <div className="flex items-center space-x-2 px-2 py-1">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(
                        category.id
                      )}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(
                          category.id,
                          checked as boolean
                        )
                      }
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {category.name}
                    </label>
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Chefs */}
        <SidebarGroup>
          <SidebarGroupLabel>Chefs</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dummyChefs.map((chef) => (
                <SidebarMenuItem key={chef.id}>
                  <div className="flex items-center space-x-2 px-2 py-1">
                    <Checkbox
                      id={`chef-${chef.id}`}
                      checked={selectedChefs.includes(chef.id)}
                      onCheckedChange={(checked) =>
                        handleChefChange(chef.id, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={`chef-${chef.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {chef.name}
                    </label>
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Ingredients */}
        <SidebarGroup>
          <SidebarGroupLabel>Ingredients</SidebarGroupLabel>
          <SidebarGroupContent>
            {/* Selected Ingredients */}
            {selectedIngredients.length > 0 && (
              <div className="mb-3 p-2 bg-muted/50 rounded-md">
                <div className="text-xs font-medium text-muted-foreground mb-2">
                  Selected ({selectedIngredients.length}):
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedIngredients.map((ingredient) => (
                    <Badge
                      key={ingredient}
                      variant="default"
                      className="text-xs cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() =>
                        handleIngredientChange(ingredient, false)
                      }
                    >
                      {ingredient}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-2">
              <Input
                placeholder="Search ingredients..."
                value={ingredientSearch}
                onChange={(e) => setIngredientSearch(e.target.value)}
                className="h-8"
              />
            </div>
            <div className="max-h-48 overflow-y-auto">
              <SidebarMenu>
                {filteredIngredients
                  .slice(0, 20)
                  .map((ingredient) => (
                    <SidebarMenuItem key={ingredient}>
                      <div className="flex items-center space-x-2 px-2 py-1">
                        <Checkbox
                          id={`ingredient-${ingredient}`}
                          checked={selectedIngredients.includes(
                            ingredient
                          )}
                          onCheckedChange={(checked) =>
                            handleIngredientChange(
                              ingredient,
                              checked as boolean
                            )
                          }
                        />
                        <label
                          htmlFor={`ingredient-${ingredient}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer capitalize"
                        >
                          {ingredient}
                        </label>
                      </div>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </div>
            {filteredIngredients.length > 20 && (
              <p className="text-xs text-muted-foreground mt-2 px-2">
                Showing 20 of {filteredIngredients.length} ingredients
              </p>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default FilterSidebar;
