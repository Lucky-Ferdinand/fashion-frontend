import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Katalog = ({ allProducts }) => {
  const daftarKategori = ["Bag", "Dress", "Jacket", "Pants", "Shirt", "Shoes", "Skirt", "Socks"];

  const groupedProducts = useMemo(() => {
    if (!allProducts || allProducts.length === 0) return {};

    return allProducts.reduce((acc, item) => {
      const kat = (item.kategori || item.Kategori || "lainnya").toLowerCase();
      if (!acc[kat]) acc[kat] = [];
      acc[kat].push(item);
      return acc;
    }, {});
  }, [allProducts]);

  if (allProducts.length === 0) {
    return <div className="p-20 text-center text-gray-500 font-bold uppercase tracking-widest animate-pulse">Memuat data katalog...</div>;
  }

  return (
    <div className="w-full bg-white py-12 px-6 md:px-12 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-black tracking-widest text-black mb-2">KATALOG</h1>
        <p className="text-sm text-gray-500 tracking-widest uppercase">Jelajahi Koleksi Kami</p>
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {daftarKategori.map((kat) => {
          const key = kat.toLowerCase();
          const produkKategori = groupedProducts[key] || [];
          
          if (produkKategori.length === 0) return null;

          return (
            <div key={kat}>
              <div className="flex justify-between items-center border-b border-gray-400 pb-3 mb-8">
                <h2 className="text-xl font-bold uppercase tracking-wide">{kat}</h2>
                <Link to={`/kategori/${key}`} className="text-sm font-bold text-red-600 hover:text-black transition-colors uppercase tracking-wider flex items-center">
                  LIHAT SEMUA →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* Menampilkan hanya 4 produk agar tidak berat */}
                {produkKategori.slice(0, 4).map((item, idx) => (
                  <ProductCard key={`${key}-${idx}`} item={item} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Katalog;