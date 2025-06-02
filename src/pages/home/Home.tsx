import React, { useState, useEffect } from 'react';
import RecipeGrid from './RecipeGrid';
import type { Recipe } from '@/components/types/recipes';
import dummyRecipes from '@/data/dummyRecipes';

function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch(
          'https://script.google.com/macros/s/.../exec?action=getRecipes'
        );

        if (!response.ok) throw new Error('Failed to fetch');

        const data = await response.json();
        const mapped = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description || '',
          categoryIds: item.categoryIds || [],
          imageUrl: item.imageUrl || '',
          sourceType: item.sourceType || '',
        }));
        setRecipes(mapped);
      } catch (err: any) {
        console.error('Fetch failed, using dummy data:', err);

        // Fallback to dummy data
        setRecipes(dummyRecipes);
        setError('Showing dummy data due to fetch error');
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">My Recipes</h1>
      <p className="text-gray-600 mb-6">
        Quick access to all your saved recipes.
      </p>

      {loading && (
        <div className="text-center text-gray-500">
          Loading recipes...
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-100 text-red-700 p-4 rounded">
          {error}
        </div>
      )}

      {!loading && !error && recipes.length === 0 && (
        <p className="text-center text-gray-500">No recipes found.</p>
      )}

      {!loading && recipes.length > 0 && (
        <RecipeGrid recipes={recipes} />
      )}
    </div>
  );
}

export default HomePage;
