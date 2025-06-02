export default function Categories() {
  const categories = [
    { name: 'Breakfast', count: 12 },
    { name: 'Lunch', count: 18 },
    { name: 'Dinner', count: 24 },
    { name: 'Desserts', count: 15 },
    { name: 'Vegetarian', count: 20 },
    { name: 'Vegan', count: 10 },
    { name: 'Gluten-Free', count: 8 },
    { name: 'Quick Meals', count: 14 },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>
      <p className="text-gray-600 mb-8">
        Browse recipes by category.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.name}
            className="border rounded-lg p-6 hover:border-rose-500 transition-colors"
          >
            <h3 className="font-semibold text-lg">{category.name}</h3>
            <p className="text-gray-600 text-sm mt-2">
              {category.count} recipes
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
