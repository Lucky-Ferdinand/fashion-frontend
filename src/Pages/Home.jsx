import React from 'react';

// Fungsi untuk membaca path gambar langsung dari folder src/assets/image/
const getImageUrl = (name) => {
  return new URL(`../assets/image/${name}`, import.meta.url).href;
};

function Home() {
  return (
    <div className="w-full bg-white text-black min-h-screen">
      
      {/* SECTION 1: HERO GRID (Gambar 1, 2, 3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 min-h-[85vh] relative">
        <div className="relative overflow-hidden group h-[85vh]">
          <img src={getImageUrl('home_1.jpg')} alt="Outfit 1" className="w-full h-full object-cover" />
        </div>
        
        {/* Kolom Tengah dengan Teks Overlay Utama */}
        <div className="relative overflow-hidden group h-[85vh]">
          <img src={getImageUrl('home_2.jpg')} alt="Outfit 2" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/10 flex flex-col justify-end items-center pb-16 text-white">
            <h1 className="text-4xl md:text-5xl font-bold tracking-wider mb-2">OUTFIT FASHION</h1>
            <p className="text-sm tracking-wide underline underline-offset-4 cursor-pointer hover:text-gray-200 transition-colors">
              Cek katalog terbaru kami
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden group h-[85vh]">
          <img src={getImageUrl('home_3.jpg')} alt="Outfit 3" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* SECTION 2: EXTRA GALLERY (Gambar 4, 5, 6) */}
      <div className="grid grid-cols-1 md:grid-cols-3 min-h-[85vh]">
        <div className="h-[85vh] overflow-hidden">
          <img src={getImageUrl('home_4.jpg')} alt="Outfit 4" className="w-full h-full object-cover" />
        </div>
        <div className="h-[85vh] overflow-hidden">
          <img src={getImageUrl('home_5.jpg')} alt="Outfit 5" className="w-full h-full object-cover" />
        </div>
        <div className="h-[85vh] overflow-hidden">
          <img src={getImageUrl('home_6.jpg')} alt="Outfit 6" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* SECTION 3: KATALOG KAMI (Gambar 7, 8, 9) */}
      <div className="grid grid-cols-1 md:grid-cols-3 min-h-[85vh] relative">
        {/* Overlay Text Mutlak di Atas Grid */}
        <div className="absolute inset-0 z-10 flex items-start justify-center pt-16 pointer-events-none">
          <h2 className="text-white text-6xl md:text-8xl font-black tracking-widest drop-shadow-lg">
            KATALOG KAMI
          </h2>
        </div>
        
        <div className="h-[85vh] overflow-hidden">
          <img src={getImageUrl('home_7.jpg')} alt="Katalog 1" className="w-full h-full object-cover" />
        </div>
        <div className="h-[85vh] overflow-hidden">
          <img src={getImageUrl('home_8.jpg')} alt="Katalog 2" className="w-full h-full object-cover" />
        </div>
        <div className="h-[85vh] overflow-hidden">
          <img src={getImageUrl('home_9.jpg')} alt="Katalog 3" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* SECTION 4: LOWER GALLERY (Gambar 10, 11, 12) */}
      <div className="grid grid-cols-1 md:grid-cols-3 min-h-[85vh]">
        <div className="h-[85vh] overflow-hidden">
          <img src={getImageUrl('home_10.jpg')} alt="Katalog 4" className="w-full h-full object-cover" />
        </div>
        <div className="h-[85vh] overflow-hidden">
          <img src={getImageUrl('home_11.jpg')} alt="Katalog 5" className="w-full h-full object-cover" />
        </div>
        <div className="h-[85vh] overflow-hidden">
          <img src={getImageUrl('home_12.jpg')} alt="Katalog 6" className="w-full h-full object-cover" />
        </div>
      </div>

    </div>
  );
}

export default Home;