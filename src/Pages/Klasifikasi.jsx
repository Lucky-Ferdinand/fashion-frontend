import React, { useState } from 'react';
import axios from 'axios';

function Klasifikasi() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // State untuk hasil analisis klasifikasi dari backend
  const [analisis, setAnalisis] = useState({ kategori: '', confidence: 0 });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      // Reset hasil saat memilih gambar baru
      setRecommendations([]);
      setAnalisis({ kategori: '', confidence: 0 });
    }
  };

  const handleGetRecommendations = async () => {
    if (!selectedFile) return alert("Pilih gambar pakaian terlebih dahulu!");
    
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Memanggil endpoint backend terpadu port 8000 /recommend
      const response = await axios.post('http://localhost:8000/recommend', formData);
      
      if (response.data && response.data.data && response.data.data.length > 0) {
        const results = response.data.data;
        setRecommendations(results);
        
        // Mengambil data kategori dan similarity skor tertinggi dari hasil AI
        setAnalisis({ 
          kategori: results[0].kategori || "UMUM", 
          confidence: Math.round(results[0].similarity * 100) 
        });
      } else {
        alert("Tidak ada rekomendasi yang ditemukan untuk gambar ini.");
        setRecommendations([]);
      }
    } catch (error) {
      console.error("Error AI:", error);
      alert("Gagal terhubung ke AI. Pastikan server master terpadu berjalan di port 8000.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full bg-white py-12 px-6 md:px-12 font-sans">
      {/* JUDUL UTAMA */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold mb-2">Mulai klasifikasi pakaian</h1>
        <p className="text-gray-500 text-sm">Silahkan upload file pakaian untuk menentukan kategori pakaian !</p>
      </div>

      {/* SECTION ATAS: UPLOAD & ANALISIS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* KOTAK UNGGAH */}
        <div className="flex flex-col gap-6">
          <div className="border-2 border-gray-400 rounded-3xl h-80 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all relative overflow-hidden">
              <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" id="fileInput" />
              {preview ? (
                <img src={preview} className="h-full w-full object-contain p-2" alt="Preview" />
              ) : (
                <div className="text-center">
                  <p className="text-gray-500">Unggah gambar kesini</p>
                  <span className="text-xs text-gray-400">Tipe file: JPG, PNG</span>
                </div>
              )}
          </div>
          <button 
            onClick={handleGetRecommendations} 
            disabled={loading || !selectedFile}
            className="w-full py-4 border-2 border-gray-400 rounded-2xl font-medium hover:bg-gray-100 transition-all disabled:opacity-50"
          >
            {loading ? "Menganalisis..." : "Mulai Klasifikasi"}
          </button>
        </div>

        {/* KOTAK HASIL ANALISIS */}
        <div className="border-2 border-gray-400 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Hasil Analisis</h2>
          <div className="border-2 border-gray-400 rounded-xl p-4 mb-6">
            <p className="text-gray-500 text-sm">Kategori pakaian:</p>
            <p className="font-bold text-lg uppercase">{analisis.kategori || "-"}</p>
          </div>
          <div className="border-2 border-gray-400 rounded-xl p-4 w-40 mb-8">
            <p className="text-gray-500 text-xs">Confidence Score:</p>
            <p className="text-4xl font-bold">{analisis.confidence > 0 ? analisis.confidence : 0}%</p>
          </div>
          <p style={{ contentVisibility: 'auto' }} className="text-sm mb-2">Tingkat keyakinan: {analisis.confidence > 0 ? analisis.confidence : 0}%</p>
          <div className="w-full bg-gray-200 rounded-full h-5 border border-gray-400 p-0.5">
            <div className="bg-red-600 h-full rounded-full transition-all duration-500" style={{ width: `${analisis.confidence > 0 ? analisis.confidence : 0}%` }}></div>
          </div>
        </div>
      </div>

      {/* SECTION BAWAH: HASIL REKOMENDASI VISUAL */}
      {recommendations.length > 0 ? (
        <div className="max-w-6xl mx-auto mt-20">
          <h2 className="text-3xl font-semibold text-center mb-2">Hasil Rekomendasi</h2>
          <p className="text-center text-gray-500 mb-12">Hasil rekomendasi didapatkan berdasarkan kemiripan visual!</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {recommendations.map((item, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="border-2 border-gray-400 rounded-3xl overflow-hidden aspect-[4/5] mb-4">
                  <img 
                    // PERUBAHAN DISINI: Mengambil langsung dari image_url
                    src={item.image_url} 
                    className="w-full h-full object-cover" 
                    alt={item.title} 
                    loading="lazy" // Tambahan agar loading lebih ringan
                    onError={(e) => { e.target.src = 'https://placehold.co/400x500?text=Gambar+Tidak+Tersedia'; }}
                  />
                </div>
                <p className="font-bold text-sm mb-1">{item.gender || "WOMEN"} <span className="text-gray-400">| {item.kategori || "DRESS"}</span></p>
                <p className="text-sm mb-2 text-gray-700 line-clamp-2">{item.title}</p>
                <p className="font-bold text-sm">Warna: <span className="font-normal">{item.warna}</span></p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto mt-20">
          <div className="text-center p-10 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
            <p className="text-gray-400">Lakukan proses klasifikasi gambar untuk menampilkan hasil rekomendasi visual produk.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Klasifikasi;