export default function Recipes() { return (
<main className="container mx-auto px-4 py-8">
  <h1 className="text-3xl font-bold mb-6">Recipes</h1>
  <p className="text-gray-600 mb-8">
    Browse our collection of delicious recipes.
  </p>

  <div
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  >
    {/* Placeholder for recipe cards */} {[1, 2, 3, 4, 5,
    6].map((item) => (
    <div key="{item}" className="border rounded-lg overflow-hidden">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">Recipe Title {item}</h3>
        <p className="text-gray-600 text-sm mt-2">
          A short description of this delicious recipe.
        </p>
        <div className="flex items-center mt-4">
          <span className="text-xs text-gray-500">30 mins</span>
          <span className="mx-2">•</span>
          <span className="text-xs text-gray-500">Easy</span>
        </div>
      </div>
    </div>
    ))}
  </div>
</main>
) }
