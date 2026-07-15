import React from 'react';
// 1. Mengimpor gambar dari folder src/assets
import fotoKelas from '../assets/image_tentang_kami/tentang_1.jpeg';
import ilustrasiMisi from '../assets/image_tentang_kami/tentang_2.jpeg';

const TentangKami = () => {
  return (
    <div className="w-full bg-white py-12 px-6 md:px-12 min-h-screen">

      {/* GRID SIAPA KAMI & MISI KAMI */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
        {/* SIAPA KAMI */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Siapa Kami</h2>
          <div className="h-64 rounded-3xl mb-6 overflow-hidden shadow-md">
             {/* 2. Menggunakan variabel import */}
             <img src={fotoKelas} alt="Kelas 3 TI C" className="w-full h-full object-cover" />
          </div>
          <p className="text-gray-700 leading-relaxed">
            Kami adalah mahasiswa Teknik Informatika Kelas 3 TI C Angkatan 2023 Politeknik Caltex Riau. 
            Berangkat dari latar belakang akademis yang kuat di bidang teknologi informasi, kami menggabungkan 
            kreativitas, kecerdasan buatan, dan keahlian rekayasa perangkat lunak untuk menciptakan solusi 
            klasifikasi e-commerce yang cerdas dan inovatif. Proyek ini merupakan wujud nyata dari dedikasi 
            kami dalam menerapkan ilmu teknologi demi memajukan ekosistem digital Indonesia.
          </p>
        </div>

        {/* MISI KAMI */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Misi Kami</h2>
          <div className="h-64 rounded-3xl mb-6 overflow-hidden shadow-md">
            {/* 3. Menggunakan variabel import */}
            <img src={ilustrasiMisi} alt="Misi Kami" className="w-full h-full object-cover" />
          </div>
          <ul className="space-y-4 text-gray-700">
            <li><strong>• Inovasi & Otomatisasi Akurat:</strong> Mendorong inovasi di industri digital melalui sistem otomatisasi klasifikasi produk yang presisi.</li>
            <li><strong>• Manajemen Katalog Cerdas:</strong> Membantu platform e-commerce menyusun dan merapikan katalog produk secara cerdas dan terstruktur.</li>
            <li><strong>• Analisis Pasar yang Cepat:</strong> Mempercepat proses analisis tren pasar untuk pengambilan keputusan bisnis yang lebih responsif.</li>
            <li><strong>• Peningkatan Konversi Penjualan:</strong> Menyajikan rekomendasi produk yang tepat sasaran guna mendorong pertumbuhan dan konversi penjualan.</li>
          </ul>
        </div>
      </div>

      {/* PERJALANAN KAMI */}
      <div className="max-w-4xl mx-auto text-center bg-gray-50 p-10 rounded-3xl border border-gray-100">
        <h2 className="text-3xl font-bold mb-6">Perjalanan Kami</h2>
        <p className="text-gray-700 leading-relaxed">
          Perjalanan kami dimulai dari ruang kelas 3 TI C Teknik Informatika (Angkatan 2023) Politeknik Caltex Riau. 
          Didorong oleh ketertarikan di bidang analisis data dan kecerdasan buatan, seluruh anggota kelas berkolaborasi 
          untuk mengatasi masalah efisiensi katalog di industri e-commerce. Melalui sinergi berskala besar, kami 
          melewati setiap tahapan—mulai dari pengumpulan dataset, data cleaning, pelatihan model klasifikasi, 
          hingga perancangan website ini. Platform ini adalah bukti nyata dedikasi kami dalam menghadirkan 
          teknologi inovatif bagi ekosistem digital Indonesia.
        </p>
      </div>
    </div>
  );
};

export default TentangKami;