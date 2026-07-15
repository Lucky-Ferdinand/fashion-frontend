import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Wallet, Star, Zap, ArrowRight, ShieldAlert } from 'lucide-react';

function DashboardAdmin() {
  const adminModules = [
    {
      name: 'Tren Product',
      path: '/admin/tren-product',
      desc: 'Analisis dan proyeksi tren penjualan fashion hingga 365 hari ke depan.',
      icon: <TrendingUp size={24} className="text-black" />,
    },
    {
      name: 'Dynamic Pricing',
      path: '/admin/dynamic-pricing',
      desc: 'Rekomendasi penyesuaian harga dinamis berdasarkan prediksi demand GRU.',
      icon: <Wallet size={24} className="text-black" />,
    },
    {
      name: 'Rating Produk',
      path: '/admin/rating-produk',
      desc: 'Kompilasi ulasan pelanggan dan peramalan rating menggunakan LSTM.',
      icon: <Star size={24} className="text-black" />,
    },
    {
      name: 'Next Item Purchase',
      path: '/admin/next-purchase',
      desc: 'Simulator prediksi sekuensial item yang akan dibeli oleh pelanggan.',
      icon: <Zap size={24} className="text-red-600" />,
    },
  ];

  return (
    <div className="font-sans text-black">
      {/* HEADER DASHBOARD */}
      <div className="mb-10 border-b border-gray-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 uppercase tracking-widest">Panel Kontrol & Manajemen Sistem AI E-Commerce</p>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 border border-gray-200 text-xs font-bold uppercase tracking-widest">
          <span className="h-2 w-2 rounded-full bg-green-600 animate-pulse"></span>
          Status: Sistem AI Aktif
        </div>
      </div>

      {/* STATS OVERVIEW STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 border border-gray-200 shadow-sm">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Total Model ML</p>
          <h2 className="text-4xl font-black tracking-tight">4</h2>
          <span className="text-[10px] text-green-600 font-bold uppercase tracking-wider mt-2 inline-block">Operational</span>
        </div>
        <div className="bg-white p-6 border border-gray-200 shadow-sm">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Katalog Produk</p>
          <h2 className="text-4xl font-black tracking-tight">1,983+</h2>
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-2 inline-block">Amazon Fashion</span>
        </div>
        <div className="bg-white p-6 border border-gray-200 shadow-sm">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Akurasi Rata-rata</p>
          <h2 className="text-4xl font-black tracking-tight">94.2%</h2>
          <span className="text-[10px] text-green-600 font-bold uppercase tracking-wider mt-2 inline-block">Optimized</span>
        </div>
        <div className="bg-white p-6 border border-gray-200 shadow-sm">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Akses Level</p>
          <h2 className="text-4xl font-black tracking-tight text-red-600">ROOT</h2>
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-2 inline-block">Administrator</span>
        </div>
      </div>

      {/* MODUL MENU UTAMA */}
      <h2 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-black pb-2">Navigasi Modul AI</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {adminModules.map((mod, idx) => (
          <Link
            key={idx}
            to={mod.path}
            className="group bg-white p-8 border border-gray-200 shadow-sm hover:border-black hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="h-12 w-12 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-gray-100 transition-colors">
                  {mod.icon}
                </div>
                <ArrowRight size={20} className="text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight mb-2">{mod.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-wider">{mod.desc}</p>
            </div>
            <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-black">
              <span>Buka Panel</span>
              <span>&rarr;</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DashboardAdmin;