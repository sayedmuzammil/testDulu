import type { Recipe } from '@/components/types/recipes';

const dummyRecipes: Recipe[] = [
  {
    id: 1,
    title: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta dish with eggs and pancetta.',
    categoryIds: [1, 3],
    ingredients: [
      { id: 1, name: 'Spaghetti', quantity: 400, unit: 'g' },
      { id: 2, name: 'Pancetta', quantity: 200, unit: 'g' },
      { id: 3, name: 'Eggs', quantity: 4, unit: 'pieces' },
      {
        id: 4,
        name: 'Parmesan cheese',
        quantity: 100,
        unit: 'g',
      },
      {
        id: 5,
        name: 'Black pepper',
        quantity: 1,
        unit: 'tsp',
      },
    ],
    steps: [
      'Cook spaghetti in salted boiling water until al dente.',
      'Fry pancetta in a large pan until crispy.',
      'Beat eggs with grated Parmesan and black pepper.',
      'Drain pasta and add to pancetta pan.',
      'Remove from heat and quickly mix in egg mixture.',
      'Serve immediately with extra Parmesan.',
    ],
    chefId: 1,
    videoUrl: 'https://youtu.be/3AAdKl1UYZs',
    imageUrl: 'https://source.unsplash.com/400x300/?spaghetti',
    sourceUrl: 'https://youtube.com/spaghetti',
    sourceType: 'Youtube',
    createdBy: 1,
    createdAt: '2025-06-01T10:00:00Z',
    updatedAt: '2025-06-01T10:00:00Z',
  },
  {
    id: 2,
    title: 'Avocado Toast',
    description: 'Simple and healthy breakfast toast.',
    categoryIds: [2],
    ingredients: [
      {
        id: 6,
        name: 'Bread',
        quantity: 2,
        unit: 'slices',
      },
      {
        id: 7,
        name: 'Avocado',
        quantity: 1,
        unit: 'piece',
      },
      { id: 8, name: 'Lemon juice', quantity: 1, unit: 'tbsp' },
      { id: 9, name: 'Salt', quantity: 0.5, unit: 'tsp' },
      {
        id: 10,
        name: 'Red pepper flakes',
        quantity: 0.25,
        unit: 'tsp',
      },
    ],
    steps: [
      'Toast the bread slices until golden brown.',
      'Mash the avocado in a bowl with lemon juice and salt.',
      'Spread the avocado mixture on the toast.',
      'Sprinkle with red pepper flakes if desired.',
      'Serve immediately.',
    ],
    chefId: 2,
    videoUrl: 'https://www.instagram.com/reel/avocadotoast',
    imageUrl: 'https://source.unsplash.com/400x300/?avocado-toast',
    sourceUrl: 'https://instagram.com/avocado',
    sourceType: 'instagram',
    createdBy: 2,
    createdAt: '2025-06-02T08:00:00Z',
    updatedAt: '2025-06-02T08:00:00Z',
  },
];

export default dummyRecipes;
