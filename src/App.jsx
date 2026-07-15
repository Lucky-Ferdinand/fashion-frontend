import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Papa from 'papaparse';

// Komponen Navigasi
import Navbar from './components/Navbar';
import NavbarAdmin from './components/NavbarAdmin'; // Import Navbar Admin
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy loading halaman
const Home = lazy(() => import('./Pages/Home'));
const Klasifikasi = lazy(() => import('./Pages/Klasifikasi'));
const Katalog = lazy(() => import('./Pages/Katalog'));
const KategoriDetail = lazy(() => import('./Pages/KategoriDetail'));
const TentangKami = lazy(() => import('./Pages/TentangKami'));
const Login = lazy(() => import('./Pages/Login'));
const Admin = lazy(() => import('./pages_admin/Admin'));

// Komponen pembantu untuk mengatur tampilan navbar secara kondisional
function MainLayout({ allProducts }) {
  const location = useLocation();
  // Cek apakah URL diawali dengan kata "/admin"
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Tampilkan Navbar yang sesuai berdasarkan rute */}
      {isAdminRoute ? <NavbarAdmin /> : <Navbar />}
      
      <main className="flex-grow w-full">
        <Suspense fallback={<div className="p-20 text-center">Memuat halaman...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/klasifikasi" element={<Klasifikasi />} />
            <Route path="/katalog" element={<Katalog allProducts={allProducts} />} />
            <Route path="/kategori/:kategori" element={<KategoriDetail allProducts={allProducts} />} />
            <Route path="/tentang-kami" element={<TentangKami />} />
            
            {/* Rute Admin & Fitur-fiturnya dilindungi */}
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path="/admin/tren-product" element={<ProtectedRoute><Admin page="tren" /></ProtectedRoute>} />
            <Route path="/admin/dynamic-pricing" element={<ProtectedRoute><Admin page="pricing" /></ProtectedRoute>} />
            <Route path="/admin/rating-produk" element={<ProtectedRoute><Admin page="rating" /></ProtectedRoute>} />
            <Route path="/admin/next-purchase" element={<ProtectedRoute><Admin page="next-purchase" /></ProtectedRoute>} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Papa.parse('/dataset_cv_final_v3.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setAllProducts(results.data);
        setIsLoading(false);
      },
      error: (err) => {
        console.error("Gagal memuat dataset:", err);
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-bold animate-pulse">Memuat Sistem...</p>
      </div>
    );
  }

  return (
    <Router>
      <MainLayout allProducts={allProducts} />
    </Router>
  );
}

export default App;