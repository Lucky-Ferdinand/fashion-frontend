import React from 'react';

const ProductCard = ({ item }) => {
  if (!item) return null;

  return (
    <div className="bg-white group cursor-pointer flex flex-col h-full border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
      <div className="relative h-[300px] w-full overflow-hidden bg-gray-100">
        <img 
          src={item.image_url} 
          alt={item.title}
          loading="lazy" 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => { e.target.src = 'https://placehold.co/400x500?text=Gambar+Tidak+Tersedia'; }}
        />
        {item.similarity && (
          <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded text-[11px] font-bold shadow-sm">
            {Math.round(item.similarity * 100)}% Match
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          {item.gender || "UNISEX"} | {item.kategori || "UMUM"}
        </span>
        <h3 className="text-sm font-semibold text-gray-800 leading-tight mb-2 line-clamp-2 flex-grow">
          {item.title}
        </h3>
        <div className="mt-auto">
          <span className="text-[12px] text-gray-600">
            Warna: <span className="font-medium text-black capitalize">{item.warna || "-"}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;