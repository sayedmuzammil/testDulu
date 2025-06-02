import { Routes, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('./pages/home/Home'));

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
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
