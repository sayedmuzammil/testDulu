// import type { Recipe } from '../../types/recipes';
// import { getCategoryNames } from '@/utils/categoryUtils';
// import { Link } from 'react-router-dom';

// function RecipeCard({ recipe }: { recipe: Recipe }) {
//   return (
//     <div className="bg-white rounded shadow hover:shadow-md">
//       <img
//         src={recipe.imageUrl || '/placeholder.svg'}
//         alt={recipe.title}
//         className="w-full h-48 object-cover"
//         onError={(e) => {
//           const target = e.target as HTMLImageElement;
//           target.onerror = null;
//           target.src = 'https://placehold.co/300x200?text=No+Image';
//         }}
//       />
//       <div className="p-4">
//         <h2 className="font-bold text-lg">{recipe.title}</h2>
//         <p className="text-sm text-gray-600">{recipe.description}</p>
//         <p className="text-xs text-gray-500 mt-1">
//           {getCategoryNames(recipe.categoryIds).join(', ')}
//         </p>
//         <Link
//           to={`/recipes/${recipe.id}`}
//           className="text-rose-500 text-sm mt-2 block"
//         >
//           View Recipe →
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default RecipeCard;

import type { Recipe } from '@/components/types/recipes';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';
import dummyChefs from '@/data/dummyChefs';
import dummyCategories from '@/data/dummyCategories';
import { Badge } from '@/components/ui/badge';
import { ChefHat } from 'lucide-react';

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getChefName = (chefId: number) => {
    const chef = dummyChefs.find((c) => c.id === chefId);
    return chef?.name || 'Unknown Chef';
  };

  const getCategoryNames = (categoryIds: number[]) => {
    // Ensure categoryIds is an array before mapping
    if (!categoryIds || !Array.isArray(categoryIds)) {
      return [];
    }

    return categoryIds
      .map((id) => {
        const category = dummyCategories.find((c) => c.id === id);
        return category?.name || '';
      })
      .filter(Boolean);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={
            imageError || !recipe.imageUrl
              ? 'https://placehold.co/300x200?text=No+Image'
              : recipe.imageUrl
          }
          alt={recipe.title}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-1">
          {recipe.title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {recipe.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-2">
          {getCategoryNames(recipe.categoryIds || []).map(
            (category) => (
              <Badge
                key={category}
                variant="secondary"
                className="text-xs"
              >
                {category}
              </Badge>
            )
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ChefHat className="h-4 w-4" />
          <span>{getChefName(recipe.chefId)}</span>
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          {recipe.ingredients?.length || 0} ingredients •{' '}
          {recipe.steps?.length || 0} steps
        </div>
      </CardContent>
    </Card>
  );
}

export default RecipeCard;
