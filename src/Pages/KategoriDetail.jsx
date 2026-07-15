import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const KategoriDetail = ({ allProducts }) => {
  const { kategori } = useParams();
  const navigate = useNavigate();
  
  // State untuk membatasi jumlah produk yang di-render (Mulai dari 10)
  const [visibleCount, setVisibleCount] = useState(10);

  // 1. Filter data hanya untuk kategori yang dipilih (Aman dan cepat karena useMemo)
  const filteredProducts = useMemo(() => {
    if (!allProducts || allProducts.length === 0) return [];
    return allProducts.filter(item => 
      item.kategori && item.kategori.toLowerCase() === kategori.toLowerCase()
    );
  }, [allProducts, kategori]);

  // 2. Potong array HANYA sampai batas visibleCount (Misal: 0 sampai 10)
  const displayedProducts = filteredProducts.slice(0, visibleCount);

  // 3. Fungsi untuk menambah 10 produk lagi ke layar saat tombol ditekan
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  return (
    <div className="w-full bg-white py-12 px-6 md:px-12 min-h-screen">
      {/* Tombol Kembali */}
      <button onClick={() => navigate(-1)} className="mb-8 font-bold text-sm underline cursor-pointer hover:text-gray-600 transition-colors">
        ← KEMBALI
      </button>
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-black uppercase tracking-wider">{kategori}</h1>
        <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mt-2 sm:mt-0">
          Menampilkan {displayedProducts.length} dari {filteredProducts.length} Produk
        </p>
      </div>

      {/* Grid Produk (Sangat ringan karena hanya merender maksimal 'visibleCount') */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {displayedProducts.map((item, idx) => (
          <ProductCard key={`${kategori}-${idx}`} item={item} />
        ))}
      </div>

      {/* Tombol "Tampilkan Lebih Banyak" */}
      {visibleCount < filteredProducts.length && (
        <div className="flex justify-center mt-16">
          <button
            onClick={handleLoadMore}
            className="px-10 py-4 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-all shadow-md rounded-xl"
          >
            Tampilkan Lebih Banyak ↓
          </button>
        </div>
      )}

      {/* Pesan jika data kosong */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-gray-400 font-bold tracking-widest uppercase">
          Tidak ada produk di kategori ini.
        </div>
      )}
    </div>
  );
};

export default KategoriDetail;