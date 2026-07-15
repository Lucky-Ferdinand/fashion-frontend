import React, { useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"; //

const DynamicPricing = () => {
  const [loading, setLoading] = useState(false); //
  const [result, setResult] = useState(null); //

  // Default state input produk
  const [formData, setFormData] = useState({
    parent_asin: "B07GSH4FW5",
    title: "Back From Bali Womens Pants",
    price: 42.95,
    average_rating: 4.4,
    rating_number: 120,
  });

  // Default state histori 12 bulan
  const [history, setHistory] = useState([
    { month: "2025-01", monthly_review_count: 2, monthly_avg_rating: 4.4 },
    { month: "2025-02", monthly_review_count: 3, monthly_avg_rating: 4.5 },
    { month: "2025-03", monthly_review_count: 2, monthly_avg_rating: 4.4 },
    { month: "2025-04", monthly_review_count: 4, monthly_avg_rating: 4.6 },
    { month: "2025-05", monthly_review_count: 3, monthly_avg_rating: 4.5 },
    { month: "2025-06", monthly_review_count: 5, monthly_avg_rating: 4.6 },
    { month: "2025-07", monthly_review_count: 2, monthly_avg_rating: 4.4 },
    { month: "2025-08", monthly_review_count: 3, monthly_avg_rating: 4.5 },
    { month: "2025-09", monthly_review_count: 4, monthly_avg_rating: 4.6 },
    { month: "2025-10", monthly_review_count: 3, monthly_avg_rating: 4.5 },
    { month: "2025-11", monthly_review_count: 2, monthly_avg_rating: 4.4 },
    { month: "2025-12", monthly_review_count: 5, monthly_avg_rating: 4.7 },
  ]);

  const handleProductChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    }); //
  };

  const handleHistoryChange = (index, field, value) => {
    const updated = [...history]; //
    updated[index][field] = value; //
    setHistory(updated); //
  };

  const handlePredict = async () => {
    try {
      setLoading(true); //
      const payload = { ...formData, history }; //

      // Disesuaikan ke rute /predict-demand agar tidak bentrok dengan /predict milik rating
      const response = await axios.post("http://127.0.0.1:8000/predict-demand", payload); //
      setResult(response.data); //
    } catch (error) {
      console.error(error); //
      alert("Gagal melakukan prediksi. Pastikan backend_dynamic/main_unified berjalan di port 8000.");
    } finally {
      setLoading(false); //
    }
  };

  const chartData = result
    ? [
        ...result.history.map((item) => ({
          month: item.month,
          historical: item.monthly_review_count,
        })),
        ...result.forecast.map((item) => ({
          month: item.month,
          predicted: item.predicted_demand,
        })),
      ] //
    : [];

  return (
    <div className="font-sans text-black">
      {/* Header */}
      <div className="mb-10 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Dynamic Pricing ML</h1>
        <p className="text-sm text-gray-500 uppercase tracking-widest">Model GRU Delta Demand 12 Bulan</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Form Input Produk */}
        <div className="bg-white p-6 border border-gray-200 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-black pb-2">Input Produk</h2>
          
          <div className="space-y-5">
            <div>
              <label className="text-[10px] text-gray-500 uppercase tracking-widest">Parent ASIN</label>
              <input name="parent_asin" value={formData.parent_asin} onChange={handleProductChange} className="w-full border-b border-gray-300 py-2 outline-none focus:border-red-600 transition-colors text-sm" />
            </div>
            <div>
              <label className="text-[10px] text-gray-500 uppercase tracking-widest">Title</label>
              <input name="title" value={formData.title} onChange={handleProductChange} className="w-full border-b border-gray-300 py-2 outline-none focus:border-red-600 transition-colors text-sm" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-widest">Price ($)</label>
                <input type="number" name="price" value={formData.price} onChange={handleProductChange} className="w-full border-b border-gray-300 py-2 outline-none focus:border-red-600 transition-colors text-sm" />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-widest">Avg Rating</label>
                <input type="number" step="0.1" name="average_rating" value={formData.average_rating} onChange={handleProductChange} className="w-full border-b border-gray-300 py-2 outline-none focus:border-red-600 transition-colors text-sm" />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-widest">Rating Num</label>
                <input type="number" name="rating_number" value={formData.rating_number} onChange={handleProductChange} className="w-full border-b border-gray-300 py-2 outline-none focus:border-red-600 transition-colors text-sm" />
              </div>
            </div>
          </div>

          <button onClick={handlePredict} className="mt-8 w-full bg-black text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-colors">
            {loading ? "Memproses AI..." : "Jalankan Prediksi"}
          </button>
        </div>

        {/* Hasil Rekomendasi Pricing */}
        <div className="bg-gray-50 p-6 border border-gray-200 shadow-sm flex flex-col justify-center items-center text-center">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-6 w-full text-left border-b border-gray-300 pb-2">Rekomendasi Sistem</h2>
          
          {result ? (
            <div className="w-full">
              <h1 className={`text-2xl font-black uppercase tracking-tighter mb-2 ${result.pricing.demand_change_pct >= 0 ? "text-green-600" : "text-red-600"}`}>
                {result.pricing.pricing_decision}
              </h1>
              <div className="text-5xl font-light tracking-tighter mb-8 text-black">
                ${result.pricing.recommended_price}
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-left border-t border-gray-200 pt-4">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Base Price</p>
                  <p className="font-bold">${result.pricing.base_price}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Demand Change</p>
                  <p className="font-bold">{(result.pricing.demand_change_pct * 100).toFixed(2)}%</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Hist. Demand</p>
                  <p className="font-bold">{result.pricing.historical_mean_demand_12m}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Pred. Demand</p>
                  <p className="font-bold">{result.pricing.predicted_mean_demand_12m}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic">Belum ada data. Silakan jalankan prediksi.</p>
          )}
        </div>
      </div>

      {/* Tabel Histori & Chart */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Histori Table */}
        <div className="col-span-1 bg-white p-6 border border-gray-200 shadow-sm overflow-x-auto">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-black pb-2">Histori 12 Bulan</h2>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase tracking-widest border-b border-gray-200">
                <th className="py-2">Bulan</th>
                <th className="py-2">Reviews</th>
                <th className="py-2">Rating</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 last:border-0">
                  <td className="py-2">{item.month}</td>
                  <td className="py-2">
                    <input type="number" value={item.monthly_review_count} onChange={(e) => handleHistoryChange(index, "monthly_review_count", Number(e.target.value))} className="w-12 border-b border-gray-300 outline-none text-center" />
                  </td>
                  <td className="py-2">
                    <input type="number" step="0.1" value={item.monthly_avg_rating} onChange={(e) => handleHistoryChange(index, "monthly_avg_rating", Number(e.target.value))} className="w-12 border-b border-gray-300 outline-none text-center" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Chart Area */}
        <div className="col-span-2 bg-white p-6 border border-gray-200 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-black pb-2">Grafik Forecast</h2>
          {result ? (
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{fontSize: 12}} stroke="#9ca3af" />
                <YAxis tick={{fontSize: 12}} stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="historical" stroke="#000000" strokeWidth={2} name="Historical" dot={false} />
                <Line type="monotone" dataKey="predicted" stroke="#dc2626" strokeWidth={2} strokeDasharray="5 5" name="Predicted" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[350px] flex items-center justify-center text-gray-400 text-sm">Grafik akan muncul setelah prediksi</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicPricing;