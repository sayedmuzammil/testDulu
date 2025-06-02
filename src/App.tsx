import { Routes, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Recipes = lazy(() => import('./pages/Recipes'));
const Categories = lazy(() => import('./pages/Categories'));
const AddRecipe = lazy(() => import('./pages/AddRecipes'));

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-grow">
        <Suspense
          fallback={<div className="p-4 text-center">Loading...</div>}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/add-recipe" element={<AddRecipe />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
