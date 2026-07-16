import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Wallet, Megaphone, Boxes, Check, Shirt, Star, TrendingUp,
  TrendingDown, Minus, Activity, Percent, BadgeCheck,
  BarChart3, LayoutGrid, Sparkles
} from "lucide-react";
import { GiAmpleDress, GiConverseShoe, GiClothes, GiSkirt } from "react-icons/gi";
import { PiTShirt, PiPants, PiHandbag } from "react-icons/pi";
import { TbJacket } from "react-icons/tb";
import { FaSocks } from "react-icons/fa6";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, ReferenceLine, ReferenceArea, Brush
} from "recharts";

// =========================================================================
// API SERVICES
// =========================================================================
const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const getCategories = async () => {
  const { data } = await axios.get(`${API_BASE}/categories`);
  return data;
};

const forecastCategory = async (category) => {
  const { data } = await axios.post(`${API_BASE}/predict`, { category });
  return data;
};

const getModelPerformance = async () => {
  const { data } = await axios.get(`${API_BASE}/model-performance`);
  return data;
};


// =========================================================================
// KOMPONEN: AgentCard
// =========================================================================
function AgentCard({ title, action }) {
  const getIcon = () => {
    if (title.includes("Pricing")) return <Wallet size={22} />;
    if (title.includes("Promotion")) return <Megaphone size={22} />;
    return <Boxes size={22} />;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition duration-300">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700">
          {getIcon()}
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-500 uppercase tracking-widest">Recommendation</p>
          <h3 className="font-bold text-lg text-gray-900">{title}</h3>
        </div>
      </div>
      <div className="mt-6 pt-5 border-t border-gray-100">
        <p className="text-xs uppercase tracking-wider text-gray-400">Suggested Action</p>
        <p className="mt-2 text-lg font-bold text-black">
          {action?.replaceAll("_", " ")?.replace(/\b\w/g, (c) => c.toUpperCase())}
        </p>
      </div>
    </div>
  );
}


// =========================================================================
// KOMPONEN: CategoryGrid
// =========================================================================
const categoryIcons = {
  dress: <GiAmpleDress size={34} />,
  shirt: <PiTShirt size={34} />,
  shoes: <GiConverseShoe size={34} />,
  socks: <FaSocks size={32} />,
  pants: <PiPants size={34} />,
  bag: <PiHandbag size={34} />,
  jacket: <TbJacket size={34} />,
  outfit: <GiClothes size={34} />,
  skirt: <GiSkirt size={34} />,
};

function CategoryGrid({ categories, selectedCategory, onSelect }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4">
      {categories.map((category) => {
        const isSelected = selectedCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`relative rounded-xl border p-5 transition duration-200 flex flex-col items-center justify-center bg-white ${
              isSelected ? "border-black shadow-md" : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <div className={`mb-4 transition ${isSelected ? "text-black" : "text-gray-500"}`}>
              {categoryIcons[category]}
            </div>
            <span className={`text-xs font-bold uppercase tracking-widest ${isSelected ? "text-black" : "text-gray-500"}`}>
              {category}
            </span>
            {isSelected && (
              <div className="absolute top-3 right-3">
                <Check size={16} className="text-black" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}


// =========================================================================
// KOMPONEN: TrendBadge
// =========================================================================
function TrendBadge({ trend }) {
  const config = {
    increase: { label: "Increasing", icon: <TrendingUp size={18} />, className: "bg-green-50 text-green-700 border border-green-200" },
    decrease: { label: "Decreasing", icon: <TrendingDown size={18} />, className: "bg-red-50 text-red-700 border border-red-200" },
    stable: { label: "Stable", icon: <Minus size={18} />, className: "bg-gray-100 text-gray-700 border border-gray-200" },
  };
  const item = config[trend] || config.stable;
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${item.className}`}>
      {item.icon} {item.label}
    </div>
  );
}


// =========================================================================
// KOMPONEN: ForecastResult
// =========================================================================
function ForecastResult({ result, loading }) {
  if (loading) {
    return (
      <div className="animate-pulse space-y-7">
        <div className="border-b border-gray-200 pb-4">
          <div className="h-3 w-20 bg-gray-200 rounded mb-3"></div>
          <div className="h-9 w-48 bg-gray-200 rounded"></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-xl p-5"><div className="h-4 w-28 bg-gray-200 rounded mb-5"></div><div className="h-10 w-20 bg-gray-200 rounded"></div></div>
          <div className="rounded-xl p-5 bg-red-100"><div className="h-4 w-32 bg-red-200 rounded mb-5"></div><div className="h-10 w-20 bg-gray-200 rounded"></div></div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col justify-center items-center h-[300px] border border-gray-200 rounded-2xl bg-gray-50 text-center p-6">
        <Shirt size={48} className="text-gray-300 mb-5" />
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">Belum Ada Prediksi</h3>
        <p className="text-gray-500 text-xs mt-3 max-w-sm leading-7">
          Pilih kategori fashion di samping lalu klik <span className="font-bold text-black">Forecast Rating</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-7 transition-all duration-500">
      <div className="border-b border-gray-200 pb-4">
        <p className="uppercase tracking-[4px] text-xs text-gray-400">Category</p>
        <h1 className="text-3xl font-black mt-2 uppercase">{result.category}</h1>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2 text-gray-500 mb-4">
            <Star size={16} /> <span className="text-xs font-bold uppercase tracking-wider">Current Rating</span>
          </div>
          <h2 className="text-4xl font-bold">{result.current_rating}</h2>
        </div>
        <div className="bg-[#E60012] rounded-xl p-5 text-white shadow-md">
          <div className="flex items-center gap-2 opacity-90 mb-4">
            <TrendingUp size={16} /> <span className="text-xs font-bold uppercase tracking-wider">Forecast Rating</span>
          </div>
          <h2 className="text-4xl font-bold">{result.forecast_rating}</h2>
        </div>
      </div>
      <div className="border border-gray-200 rounded-xl px-5 py-4">
        <p className="uppercase tracking-[3px] text-xs text-gray-400 mb-3">Predicted Trend</p>
        <TrendBadge trend={result.trend} />
      </div>
    </div>
  );
}


// =========================================================================
// KOMPONEN: ForecastTimelineChart
// =========================================================================
function ForecastTimelineChart({ historical, forecast }) {
  if (!historical || !forecast) return null;

  const [historyRange, setHistoryRange] = useState("12M");
  const historyOptions = [
    { label: "6M", value: 6 },
    { label: "12M", value: 12 },
    { label: "24M", value: 24 },
    { label: "ALL", value: historical.length },
  ];

  const historyLimit = historyOptions.find((item) => item.label === historyRange)?.value || historical.length;
  const displayedHistorical = historical.slice(-historyLimit);

  const historicalData = displayedHistorical.map((item, index) => ({
    id: `H${index}`,
    month: new Date(item.date).toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
    rating: item.rating,
    type: "Historical",
  }));

  const lastDate = new Date(historical[historical.length - 1].date);
  const forecastData = forecast.map((value, index) => {
    const nextDate = new Date(lastDate);
    nextDate.setMonth(lastDate.getMonth() + index + 1);
    return {
      id: `F${index}`,
      month: nextDate.toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
      rating: value,
      type: "Forecast",
    };
  });

  const data = [...historicalData, ...forecastData];
  const forecastStart = forecastData[0].id;

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
    const point = payload[0].payload;
    const isForecast = point.type === "Forecast";
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-xl px-4 py-3 min-w-[140px]">
        <p className="font-bold text-gray-900 text-xs uppercase tracking-wider">{point.month}</p>
        <p className={`text-xs mt-1 font-bold ${isForecast ? "text-red-600" : "text-gray-500"}`}>{point.type}</p>
        <div className="mt-3">
          <span className="text-[10px] uppercase tracking-wide text-gray-400">Rating</span>
          <p className={`text-2xl font-black ${isForecast ? "text-red-600" : "text-black"}`}>{point.rating}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-7">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-black">Timeline Forecasting</h2>
          <p className="text-xs text-gray-500 mt-1 uppercase">Historical Ratings & 12-Month Prediction</p>
        </div>
        <div className="flex gap-2">
          {historyOptions.map((item) => {
            const disabled = historical.length < item.value && item.label !== "ALL";
            return (
              <button
                key={item.label} disabled={disabled} onClick={() => setHistoryRange(item.label)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${historyRange === item.label ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"} ${disabled ? "opacity-40 cursor-not-allowed hover:bg-gray-100" : ""}`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={340}>
        <LineChart data={data} margin={{ top: 25, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid vertical={false} stroke="#eeeeee" />
          <ReferenceArea x1={forecastStart} x2={data[data.length - 1].id} fill="#cf4f5a" fillOpacity={0.04} />
          <ReferenceLine x={forecastStart} stroke="#ff00159c" strokeWidth={2} strokeDasharray="6 4" label={{ value: "Forecast Start", position: "top", fill: "#fb2133", fontSize: 10, fontWeight: 800 }} />
          <XAxis dataKey="id" interval="preserveStartEnd" height={10} tickMargin={12} tickLine={false} axisLine={false} tick={{ fill: "#666", fontSize: 10, fontWeight: "bold" }} minTickGap={28} tickFormatter={(val) => data.find((d) => d.id === val)?.month} />
          <YAxis domain={[1, 5]} width={30} tickMargin={12} tickLine={false} axisLine={false} tick={{ fill: "#666", fontSize: 12, fontWeight: "bold" }} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#d1d5db", strokeWidth: 1, strokeDasharray: "4 4" }} />
          <Line type="monotone" dataKey="rating" stroke="#f8828c" strokeWidth={3} dot={(p) => <circle cx={p.cx} cy={p.cy} r={4} fill={p.payload.type === "Forecast" ? "#E60012" : "#1A1A1A"} stroke="#fff" strokeWidth={2} />} activeDot={(p) => <circle cx={p.cx} cy={p.cy} r={7} fill={p.payload.type === "Forecast" ? "#99000d" : "#374151"} stroke="#fff" strokeWidth={3} />} />
          <Brush key={historyRange} dataKey="month" height={24} travellerWidth={10} stroke="#E60012" fill="#fafafa" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}


// =========================================================================
// KOMPONEN: ModelMetrics
// =========================================================================
function ModelMetrics({ performance }) {
  if (!performance) return null;
  const metrics = [
    { icon: BadgeCheck, title: "Accuracy", value: `${performance.accuracy}%`, bg: "bg-[#E60012]", text: "text-white" },
    { icon: Activity, title: "MAE", value: performance.mae },
    { icon: TrendingDown, title: "RMSE", value: performance.rmse },
    { icon: Percent, title: "MAPE", value: `${performance.mape}%` },
  ];

  return (
    <div className="grid lg:grid-cols-4 gap-5">
      {metrics.map((item, index) => {
        const Icon = item.icon;
        return (
          <div key={index} className={`rounded-2xl p-6 border transition ${index === 0 ? "bg-[#E60012] border-[#E60012] text-white shadow-md" : "bg-white border-gray-200"}`}>
            <div className="flex justify-between items-center">
              <p className={`uppercase tracking-[3px] text-[10px] font-bold ${index === 0 ? "text-red-100" : "text-gray-400"}`}>{item.title}</p>
              <Icon size={18} className={index === 0 ? "text-white" : "text-red-600"} />
            </div>
            <h1 className={`text-4xl font-black mt-3 ${index === 0 ? "text-white" : "text-gray-900"}`}>{item.value}</h1>
          </div>
        );
      })}
    </div>
  );
}


// =========================================================================
// KOMPONEN: ModelPerformanceChart
// =========================================================================
function ModelPerformanceChart({ data }) {
  if (!data) return null;
  const chartData = data.comparison.map((item, index) => ({ index: index + 1, actual: item.actual, predicted: item.predicted }));

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest font-bold text-gray-400">Model Evaluation</p>
          <h2 className="text-xl font-black text-gray-900 mt-1 uppercase">Actual vs Predicted</h2>
        </div>
        <div className="flex items-center gap-6 mt-2">
          <div className="flex items-center gap-2"><div className="w-8 h-[3px] rounded-full bg-[#1A1A1A]"></div><span className="text-xs font-bold uppercase tracking-wider text-gray-600">Actual</span></div>
          <div className="flex items-center gap-2"><div className="w-8 h-[3px] rounded-full bg-[#E60012]"></div><span className="text-xs font-bold uppercase tracking-wider text-gray-600">Predicted</span></div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid stroke="#eeeeee" vertical={false} />
          <XAxis dataKey="index" tick={{ fill: "#6b7280", fontSize: 10 }} tickLine={false} axisLine={false} />
          <YAxis domain={[1, 5]} width={30} tickMargin={8} axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: "bold" }} />
          <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "8px", boxShadow: "0 8px 24px rgba(0,0,0,.08)", fontSize: "12px", fontWeight: "bold" }} />
          <Line type="linear" dataKey="actual" stroke="#1A1A1A" strokeWidth={2.8} dot={false} activeDot={{ r: 5 }} name="Actual" />
          <Line type="linear" dataKey="predicted" stroke="#E60012" strokeWidth={2.8} dot={false} activeDot={{ r: 5 }} name="Predicted" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}


// =========================================================================
// KOMPONEN UTAMA: RatingProduk
// =========================================================================
export default function RatingProduk() {
  const [categories, setCategories] = useState([]);
  const [result, setResult] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [performance, setPerformance] = useState(null);
  const [loadingForecast, setLoadingForecast] = useState(false);

  useEffect(() => {
    loadCategories();
    loadPerformance();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data.categories || data);
    } catch (err) {
      console.error(err);
      setCategories(["dress", "shirt", "shoes", "socks", "pants", "bag", "jacket", "outfit", "skirt"]);
    }
  };

  const loadPerformance = async () => {
    try {
      const data = await getModelPerformance();
      setPerformance(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleForecast = async () => {
    if (!selectedCategory || loadingForecast) return;
    try {
      setLoadingForecast(true);
      setResult(null);
      const response = await forecastCategory(selectedCategory);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setResult(response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingForecast(false);
    }
  };

  return (
    <div className="font-sans text-black pb-16">
      
      {/* HEADER KHUSUS ADMIN */}
      <div className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Rating Forecast AI</h1>
        <p className="text-sm text-gray-500 uppercase tracking-widest">
          Prediksi Rating Fashion Masa Depan & Rekomendasi Agen Cerdas
        </p>
      </div>

      <div className="flex flex-col gap-8">
        
        {/* MODEL METRICS & CHART */}
        {performance && (
          <section className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black pb-2">Performa Evaluasi Model LSTM</h2>
            <ModelMetrics performance={performance} />
            <ModelPerformanceChart data={performance} />
          </section>
        )}

        {/* FORECAST CONFIG & RESULT */}
        <section className="grid lg:grid-cols-12 gap-8 mt-6">
          <div className="lg:col-span-6 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <LayoutGrid size={20} className="text-gray-500" />
              <h2 className="text-sm font-bold uppercase tracking-widest">Konfigurasi Kategori</h2>
            </div>
            <CategoryGrid categories={categories} selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
            <button
              disabled={!selectedCategory || loadingForecast}
              onClick={handleForecast}
              className="w-full mt-8 py-4 rounded-xl bg-black text-white text-xs tracking-widest uppercase font-bold hover:bg-red-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <div className="flex items-center justify-center gap-3">
                {loadingForecast ? (
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <Sparkles size={16} />
                )}
                <span>{loadingForecast ? "AI Sedang Menganalisis..." : "Jalankan Prediksi Rating"}</span>
              </div>
            </button>
          </div>

          <div className="lg:col-span-6 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <BarChart3 size={20} className="text-gray-500" />
              <h2 className="text-sm font-bold uppercase tracking-widest">Hasil Prediksi</h2>
            </div>
            <ForecastResult result={result} loading={loadingForecast} />
          </div>
        </section>

        {/* TIMELINE */}
        {result && !loadingForecast && (
          <section className="mt-4">
            <ForecastTimelineChart historical={result.historical_data} forecast={result.future_forecast} />
          </section>
        )}

        {/* MULTI-AGENT RECOMMENDATION */}
        {result && !loadingForecast && result.dynamic_pricing && (
          <section className="mt-8">
            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black pb-2 mb-6">
              Rekomendasi Multi-Agen AI
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <AgentCard title="Dynamic Pricing" action={result.dynamic_pricing.action} />
              <AgentCard title="Promotion Strategy" action={result.promotion_agent.action} />
              <AgentCard title="Inventory Planning" action={result.inventory_agent.action} />
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
