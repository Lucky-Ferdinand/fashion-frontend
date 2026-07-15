import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  BarChart, Bar 
} from "recharts"; //

const TrenProduct = () => {
  const [fashionHistory, setFashionHistory] = useState([]); //[cite: 7]
  const [fashionForecast, setFashionForecast] = useState([]); //[cite: 7]
  const [amazonHistory, setAmazonHistory] = useState([]); //[cite: 7]
  const [amazonForecast, setAmazonForecast] = useState([]); //[cite: 7]
  const [selectedCategory, setSelectedCategory] = useState("outfit"); //[cite: 7]
  const [categories, setCategories] = useState([]); //[cite: 7]
  const [productData, setProductData] = useState([]); //[cite: 7]
  const [selectedProduct, setSelectedProduct] = useState(""); //[cite: 7]
  const [evalData, setEvalData] = useState([]); //[cite: 7]

  useEffect(() => {
    Papa.parse("/aktual_vs_prediksi_penjualan_fashion_lstm.csv", {
      download: true, header: true, dynamicTyping: true,
      complete: (res) => setFashionHistory(res.data.filter((r) => r.date)),
    }); //[cite: 7]

    Papa.parse("/prediksi_penjualan_fashion_1_tahun_lstm.csv", {
      download: true, header: true, dynamicTyping: true,
      complete: (res) => setFashionForecast(res.data.filter((r) => r.date)),
    }); //[cite: 7]

    Papa.parse("/aktual_vs_prediksi_sub_category_amazon.csv", {
      download: true, header: true, dynamicTyping: true,
      complete: (res) => {
        const valid = res.data.filter((r) => r.date); //[cite: 7]
        setAmazonHistory(valid); //[cite: 7]
        const uniqueCats = [...new Set(valid.map((item) => item.sub_category))].filter(Boolean); //[cite: 7]
        setCategories(uniqueCats); //[cite: 7]
        if (uniqueCats.length > 0) setSelectedCategory(uniqueCats[0]); //[cite: 7]
      },
    }); //[cite: 7]

    Papa.parse("/prediksi_1_tahun_sub_category_amazon.csv", {
      download: true, header: true, dynamicTyping: true,
      complete: (res) => setAmazonForecast(res.data.filter((r) => r.date)),
    }); //[cite: 7]

    Papa.parse("/prediksi_produk_trending_lstm.csv", {
      download: true, header: true, dynamicTyping: true,
      complete: (res) => {
        const valid = res.data.filter((r) => r.product_id); //[cite: 7]
        setProductData(valid); //[cite: 7]
        if (valid.length > 0) setSelectedProduct(valid[0].product_id); //[cite: 7]
      },
    }); //[cite: 7]

    Papa.parse("/evaluasi_model_lstm.csv", {
      download: true, header: true, dynamicTyping: true,
      complete: (res) => setEvalData(res.data.filter((r) => r.metric)),
    }); //[cite: 7]
  }, []); //[cite: 7]

  const filteredAmazonHistory = amazonHistory.filter((item) => item.sub_category === selectedCategory); //[cite: 7]
  const filteredAmazonForecast = amazonForecast.filter((item) => item.sub_category === selectedCategory); //[cite: 7]
  const currentProductDetails = productData.find((p) => p.product_id === selectedProduct); //[cite: 7]

  const getProductTrendData = () => {
    if (!currentProductDetails) return []; //[cite: 7]
    return [
      { name: "30 HR AWAL", nilai: currentProductDetails.rata_rata_30_hari_awal },
      { name: "HARIAN (AVG)", nilai: currentProductDetails.rata_rata_prediksi_harian },
      { name: "30 HR AKHIR", nilai: currentProductDetails.rata_rata_30_hari_akhir },
    ]; //[cite: 7]
  };

  const tooltipStyle = {
    backgroundColor: "#ffffff",
    border: "1px solid #000000",
    borderRadius: "0px",
    color: "#000000",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  };

  return (
    <div className="font-sans text-black">
      {/* HEADER */}
      <div className="mb-10 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Tren Product</h1>
        <p className="text-sm text-gray-500 uppercase tracking-widest">Prediksi Penjualan Fashion 365 Hari Kedepan[cite: 7]</p>
      </div>

      {/* ROW 1: Penjualan Fashion & Metrik Akurasi */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">
        
        {/* Line Chart Tren */}
        <div className="lg:col-span-2 bg-white p-6 border border-gray-200 shadow-sm">
          <div className="mb-6 border-b border-black pb-2">
            <h2 className="text-sm font-bold uppercase tracking-widest">Tren Penjualan Toko</h2>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart margin={{ right: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="date" allowDuplicatedCategory={false} tick={{ fill: "#9ca3af", fontSize: 10 }} />
                <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ paddingTop: "20px", fontSize: "12px", textTransform: "uppercase" }} />
                <Line data={fashionHistory} type="monotone" dataKey="actual_sales_trend" name="Aktual" stroke="#000000" strokeWidth={2} dot={false} />
                <Line data={fashionHistory} type="monotone" dataKey="prediction_sales_trend" name="Prediksi Sistem" stroke="#9ca3af" strokeWidth={2} dot={false} strokeDasharray="4 4" />
                <Line data={fashionForecast} type="monotone" dataKey="forecast_sales_1_year" name="Proyeksi (1 Tahun)" stroke="#dc2626" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart Akurasi */}
        <div className="bg-white p-6 border border-gray-200 shadow-sm">
          <div className="mb-6 border-b border-black pb-2">
            <h2 className="text-sm font-bold uppercase tracking-widest">Metrik Akurasi Sistem</h2>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={evalData} layout="vertical" margin={{ left: -10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                <XAxis type="number" tick={{ fill: "#9ca3af", fontSize: 10 }} />
                <YAxis dataKey="metric" type="category" tick={{ fill: "#000000", fontWeight: "bold", fontSize: 10, textTransform: "uppercase" }} width={80} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#f9fafb" }} />
                <Bar dataKey="value" fill="#000000" name="Nilai Error/Score" barSize={15} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ROW 2: Analisis Kategori Spesifik */}
      <div className="bg-white p-6 border border-gray-200 shadow-sm mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 border-b border-black pb-2">
          <h2 className="text-sm font-bold uppercase tracking-widest">Analisis Kategori Spesifik</h2>
          <div className="mt-4 sm:mt-0 flex items-center">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent border-b border-gray-300 py-1 px-2 text-xs uppercase tracking-widest font-bold focus:border-red-600 outline-none cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart margin={{ right: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="date" allowDuplicatedCategory={false} tick={{ fill: "#9ca3af", fontSize: 10 }} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ paddingTop: "20px", fontSize: "12px", textTransform: "uppercase" }} />
              <Line data={filteredAmazonHistory} type="monotone" dataKey="actual_trend" name={`Aktual (${selectedCategory})`} stroke="#000000" strokeWidth={2} dot={false} />
              <Line data={filteredAmazonHistory} type="monotone" dataKey="prediction_trend" name="Prediksi" stroke="#9ca3af" strokeWidth={2} dot={false} strokeDasharray="4 4" />
              <Line data={filteredAmazonForecast} type="monotone" dataKey="forecast_1_year" name="Proyeksi 1 Tahun" stroke="#dc2626" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ROW 3: Pemantau SKU Produk & Tabel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Card: Performa SKU */}
        <div className="bg-white p-6 border border-gray-200 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-black pb-2">Performa per SKU</h2>
          
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="w-full bg-transparent border-b border-gray-300 py-2 mb-6 text-xs uppercase tracking-widest font-bold focus:border-red-600 outline-none cursor-pointer"
          >
            {productData.map((p) => (
              <option key={p.product_id} value={p.product_id}>{p.sub_category} - {p.product_id}</option>
            ))}
          </select>

          {currentProductDetails ? (
            <div>
              <div className="border border-gray-200 p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">Sub Category</span>
                  <span className="text-xs font-bold uppercase tracking-wider">{currentProductDetails.sub_category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">Product ID</span>
                  <span className="text-xs font-bold uppercase tracking-wider">{currentProductDetails.product_id}</span>
                </div>
              </div>

              <div className="h-40 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getProductTrendData()} margin={{ left: -20, right: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 10 }} />
                    <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} />
                    <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#f9fafb" }} />
                    <Bar dataKey="nilai" fill="#000000" name="Quantity" barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gray-50 p-4 border border-gray-200 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">Status Tren</span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${currentProductDetails.status_tren === "Tren Naik" ? "text-black" : "text-red-600"}`}>
                    {currentProductDetails.status_tren === "Tren Naik" ? "[ NAIK ]" : "[ TURUN ]"}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">Estimasi (1 THN)</span>
                  <span className="text-xs font-black">{Math.round(currentProductDetails.total_prediksi_penjualan_1_tahun)} PCS</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">Rata-rata Harian</span>
                  <span className="text-xs font-bold">{currentProductDetails.rata_rata_prediksi_harian.toFixed(2)} PCS</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">Memuat data produk...</p>
          )}
        </div>

        {/* Right Card: Tabel Proyeksi */}
        <div className="lg:col-span-2 bg-white p-6 border border-gray-200 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-black pb-2">Katalog Proyeksi Produk</h2>
          
          <div className="overflow-x-auto h-[450px] overflow-y-auto">
            <table className="w-full text-left text-xs uppercase tracking-wider">
              <thead className="bg-white sticky top-0 border-b-2 border-black z-10">
                <tr>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Product ID</th>
                  <th className="px-4 py-3">Total FCST</th>
                  <th className="px-4 py-3">AVG / Day</th>
                  <th className="px-4 py-3">Trend</th>
                  <th className="px-4 py-3">R² Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {productData.map((prod, idx) => (
                  <tr 
                    key={idx} 
                    onClick={() => setSelectedProduct(prod.product_id)} 
                    className={`cursor-pointer transition-colors hover:bg-gray-50 ${selectedProduct === prod.product_id ? "bg-gray-100 font-bold" : "bg-white"}`}
                  >
                    <td className="px-4 py-3 text-[10px] text-gray-500">{prod.sub_category}</td>
                    <td className="px-4 py-3 font-bold">{prod.product_id}</td>
                    <td className="px-4 py-3">{Math.round(prod.total_prediksi_penjualan_1_tahun)}</td>
                    <td className="px-4 py-3">{prod.rata_rata_prediksi_harian?.toFixed(1)}</td>
                    <td className={`px-4 py-3 font-bold ${prod.status_tren === "Tren Naik" ? "text-black" : "text-red-600"}`}>
                      {prod.status_tren === "Tren Naik" ? "UP" : "DOWN"}
                    </td>
                    <td className="px-4 py-3">{prod["R2 Score"]?.toFixed(3) ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrenProduct;