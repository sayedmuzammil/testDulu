import type { Recipe } from '../../components/types/recipes';
import { getCategoryNames } from '@/utils/categoryUtils';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="bg-white rounded shadow hover:shadow-md">
      <img
        src={recipe.imageUrl || '/placeholder.svg'}
        alt={recipe.title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = 'https://placehold.co/300x200?text=No+Image';
        }}
      />
      <div className="p-4">
        <h2 className="font-bold text-lg">{recipe.title}</h2>
        <p className="text-sm text-gray-600">{recipe.description}</p>
        <p className="text-xs text-gray-500 mt-1">
          {getCategoryNames(recipe.categoryIds).join(', ')}
        </p>
        <Link
          to={`/recipes/${recipe.id}`}
          className="text-rose-500 text-sm mt-2 block"
        >
          View Recipe →
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;
