import { useEffect, useState } from 'react';
import type { Recipe } from '@/components/types/recipes';
import dummyRecipes from '@/data/dummyRecipes';

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbycVEB2lI4RrckcC2HnPclNLLfg6d7Ji5Vzpu05ijd-v3KO_FyHvJhwh6JeU7lXMsi5/exec?path=recipes'
        );
        if (!response.ok) throw new Error('Failed to fetch recipes');

        if (Array.isArray(response)) {
          const normalized = response.map((recipe) => ({
            ...recipe,
            categoryIds: Array.isArray(recipe.categoryIds)
              ? recipe.categoryIds
              : [recipe.categoryIds], // ✅ Convert number to array
          }));
          setRecipes(normalized);
          console.log(normalized);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setError('Failed to load recipes from API, using dummy data');
        setRecipes(dummyRecipes);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return { recipes, loading, error };
}
