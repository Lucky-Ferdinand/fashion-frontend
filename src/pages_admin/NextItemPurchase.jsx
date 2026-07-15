import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft, ChevronRight, Sparkles, X,
  Trash2, Plus, ArrowRight,
} from 'lucide-react';

const API_BASE = 'http://localhost:8000';

export default function NextItemPurchase() {
  const [products, setProducts] = useState([]);
  const [history, setHistory] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [gender] = useState('all'); 
  const [loading, setLoading] = useState(true);

  const carouselRef = useRef(null);
  const catalogRef = useRef(null);

  // Ambil produk katalog utama
  useEffect(() => {
    fetch(`${API_BASE}/api/products?page=${currentPage}&limit=24&gender=${gender}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotalPages(data.total_pages);
        setTotalItems(data.total_items ?? data.products.length);
      })
      .finally(() => setLoading(false));
  }, [currentPage, gender]);

  // Ambil Prediksi Next Item berdasarkan sequence (history)
  useEffect(() => {
    if (history.length === 0) return;
    
    fetch(`${API_BASE}/api/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ click_history: history.map((p) => p.asin), gender }),
    })
      .then((res) => res.json())
      .then((data) => setRecommendations(data))
      .catch((err) => console.error("Gagal terhubung ke AI: ", err));
  }, [history, gender]);

  const handleProductClick = (product) => {
    setHistory((prev) => {
      const filtered = prev.filter((p) => p.asin !== product.asin);
      return [product, ...filtered.slice(0, 4)];
    });
  };

  const handleRemoveHistoryItem = (asin) => {
    setHistory((prev) => prev.filter((p) => p.asin !== asin));
    if (history.length <= 1) setRecommendations([]);
  };

  const handleClearHistory = () => {
    setHistory([]);
    setRecommendations([]);
  };

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollCarousel = (dir) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setLoading(true);
      setCurrentPage(currentPage - 1);
      scrollToCatalog();
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setLoading(true);
      setCurrentPage(currentPage + 1);
      scrollToCatalog();
    }
  };

  return (
    <div style={styles.page}>
      <style>{`
        * { box-sizing: border-box; }
        html, body, #root { margin: 0; padding: 0; width: 100%; }
        body { overflow-x: hidden; }

        .u-card { transition: box-shadow 0.25s ease, transform 0.25s ease; }
        .u-card img { transition: transform 0.5s ease; }
        .u-card:hover img { transform: scale(1.05); }
        .u-card:hover { box-shadow: 0 10px 24px rgba(0,0,0,0.10); transform: translateY(-3px); }

        .u-btn-primary {
          background: #1A1A1A; color: #fff; border: 1.5px solid #1A1A1A;
          transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease;
        }
        .u-btn-primary:hover { background: #fff; color: #1A1A1A; }

        .u-btn-outline {
          background: #fff; color: #1A1A1A; border: 1.5px solid #1A1A1A;
          transition: background 0.18s ease, color 0.18s ease;
        }
        .u-btn-outline:hover:not(:disabled) { background: #1A1A1A; color: #fff; }
        .u-btn-outline:disabled { cursor: not-allowed; }

        .u-remove-x { opacity: 0; transition: opacity 0.15s ease; }
        .u-thumb-wrap:hover .u-remove-x { opacity: 1; }

        .u-carousel { scroll-snap-type: x mandatory; }
        .u-carousel-item { scroll-snap-align: start; }
        .u-carousel::-webkit-scrollbar { display: none; }
      `}</style>

      <main style={styles.mainContent}>

        {/* HEADER SEDERHANA KHUSUS ADMIN PANEL */}
        <div style={{ marginBottom: '32px', borderBottom: '1px solid #E0E0E0', paddingBottom: '24px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.5px' }}>
            NEXT ITEM PURCHASE AI
          </h1>
          <p style={{ fontSize: '14px', color: '#767676', margin: 0 }}>
            Pilih produk dari katalog di bawah untuk membangun urutan klik (sequence) dan memprediksi produk selanjutnya.
          </p>
        </div>

        {/* RIWAYAT KLIK / SEQUENCE BUILDER */}
        <section style={styles.historyBox}>
          <div style={styles.historyHead}>
            <span style={styles.historyLabel}>SEQUENCE KLIK PELANGGAN</span>
            {history.length > 0 && (
              <button style={styles.clearBtn} onClick={handleClearHistory}>
                <Trash2 size={13} /> HAPUS SEQUENCE
              </button>
            )}
          </div>
          <div style={styles.historyThumbs}>
            {history.map((item, index) => (
              <React.Fragment key={item.asin}>
                <div className="u-thumb-wrap" style={styles.thumbWrap}>
                  <img src={item.image} alt={item.title} style={styles.historyImg} />
                  <span
                    className="u-remove-x"
                    style={styles.removeX}
                    onClick={() => handleRemoveHistoryItem(item.asin)}
                  >
                    <X size={11} color="#fff" />
                  </span>
                </div>
                {index < history.length - 1 && <ArrowRight size={14} color="#ccc" />}
              </React.Fragment>
            ))}
            {history.length === 0 && (
              <p style={styles.historyEmpty}>Sequence masih kosong. Silakan klik produk pada katalog di bawah.</p>
            )}
          </div>
        </section>

        {/* PREDIKSI NEXT ITEM DARI AI */}
        {history.length > 0 && (
          <section style={styles.recoSection}>
            <div style={styles.sectionHeadRow}>
              <h2 style={styles.sectionTitleReco}>
                <Sparkles size={17} color="#E5231B" style={{ marginRight: 8 }} />
                PREDIKSI NEXT ITEM
              </h2>
              {recommendations.length > 0 && (
                <div style={styles.carouselArrows}>
                  <button style={styles.carouselArrowBtn} onClick={() => scrollCarousel(-1)}>
                    <ChevronLeft size={16} />
                  </button>
                  <button style={styles.carouselArrowBtn} onClick={() => scrollCarousel(1)}>
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
            <p style={styles.sectionSubReco}>
              Berdasarkan pola urutan klik di atas, model AI memprediksi pelanggan akan membeli produk berikut.
            </p>

            {recommendations.length > 0 ? (
              <div className="u-carousel" ref={carouselRef} style={styles.carousel}>
                {recommendations.map((item, index) => (
                  <div key={item.asin} className="u-carousel-item" style={styles.carouselItem}>
                    <ProductCard product={item} onClick={handleProductClick} aiPick predictionRank={index + 1} />
                  </div>
                ))}
              </div>
            ) : (
              <p style={styles.recoEmpty}>
                Sedang menganalisis sequence klik...
              </p>
            )}
          </section>
        )}

        {/* KATALOG UTAMA */}
        <section ref={catalogRef} style={{ scrollMarginTop: '100px' }}>
          <div style={styles.sectionHeadRow}>
            <h2 style={styles.sectionTitle}>KATALOG PRODUK UJI COBA</h2>
            <span style={styles.sectionSub}>{totalItems} produk</span>
          </div>

          {loading ? (
            <p style={{ color: '#767676', fontSize: 13 }}>Memuat produk...</p>
          ) : (
            <div style={styles.grid}>
              {products.map((product) => (
                <ProductCard key={product.asin} product={product} onClick={handleProductClick} />
              ))}
            </div>
          )}

          {/* PAGINATION */}
          <div style={styles.pagination}>
            <button
              className="u-btn-outline"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              style={{ ...styles.pageBtn, opacity: currentPage === 1 ? 0.35 : 1 }}
            >
              <ChevronLeft size={15} /> SEBELUMNYA
            </button>

            <span style={styles.pageInfo}>{currentPage} / {totalPages}</span>

            <button
              className="u-btn-outline"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              style={{ ...styles.pageBtn, opacity: currentPage === totalPages ? 0.35 : 1 }}
            >
              BERIKUTNYA <ChevronRight size={15} />
            </button>
          </div>
        </section>

      </main>
    </div>
  );
}

// Menggunakan match_score agar sinkron dengan app.py backend kamu
function ProductCard({ product, onClick, aiPick, predictionRank }) {
  return (
    <div className="u-card" style={styles.card}>
      {aiPick && (
        <span style={{...styles.aiTag, background: predictionRank === 1 ? '#E5231B' : '#1A1A1A'}}>
          {predictionRank ? `PREDIKSI #${predictionRank}` : 'AI PICK'}
        </span>
      )}
      {product.on_sale && <span style={styles.saleTag}>-{product.discount_percent}%</span>}
      <div style={styles.imgWrap}>
        <img src={product.image} alt={product.title} style={styles.img} />
      </div>
      <div style={styles.cardBody}>
        {aiPick && typeof product.match_score === 'number' && (
          <div style={styles.matchWrap}>
            <div style={styles.matchTrack}>
              <div style={{ ...styles.matchFill, width: `${Math.min(product.match_score, 100)}%` }} />
            </div>
            <span style={styles.matchLabel}>{product.match_score}% cocok</span>
          </div>
        )}
        <div style={styles.priceRow}>
          <span style={{ ...styles.price, color: product.on_sale ? '#E5231B' : '#1A1A1A' }}>
            {product.price}
          </span>
          {product.on_sale && product.original_price && (
            <span style={styles.originalPrice}>{product.original_price}</span>
          )}
        </div>
        <p style={{...styles.cardTitle, marginBottom: '2px', fontWeight: 800, fontSize: '11px'}}>{product.asin}</p>
        <p style={styles.cardTitle}>{product.title}</p>
        <button className="u-btn-primary" onClick={() => onClick(product)} style={styles.cardBtn}>
          <Plus size={13} /> PILIH PRODUK
        </button>
      </div>
    </div>
  );
}

const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

const styles = {
  page: { fontFamily: FONT, background: '#fff', color: '#1A1A1A', width: '100%', minHeight: '100vh', paddingTop: '20px' },

  mainContent: { width: '100%', maxWidth: '1600px', margin: 'auto', padding: '0 clamp(16px, 4vw, 48px) 48px' },

  historyBox: { background: '#F5F5F5', padding: '16px 20px', marginBottom: '36px', borderRadius: '2px', borderLeft: '3px solid #1A1A1A' },
  historyHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
  historyLabel: { fontSize: '11px', fontWeight: 700, letterSpacing: '0.5px', color: '#767676' },
  clearBtn: { display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#E5231B', fontSize: '11px', fontWeight: 700, letterSpacing: '0.3px', cursor: 'pointer', padding: 0 },
  historyThumbs: { display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' },
  thumbWrap: { position: 'relative' },
  historyImg: { width: '52px', height: '52px', objectFit: 'cover', border: '1px solid #ddd', display: 'block' },
  removeX: { position: 'absolute', top: -6, right: -6, background: '#1A1A1A', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  historyEmpty: { fontSize: '12px', color: '#999', margin: 0 },

  recoSection: { marginBottom: '52px', background: '#FAFAFA', padding: '28px clamp(16px, 3vw, 32px)', borderRadius: '2px', borderTop: '3px solid #E5231B' },
  sectionHeadRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', paddingBottom: '12px' },
  sectionTitle: { display: 'flex', alignItems: 'center', fontSize: '19px', fontWeight: 800, margin: 0, letterSpacing: '0.3px' },
  sectionTitleReco: { display: 'flex', alignItems: 'center', fontSize: '19px', fontWeight: 800, margin: 0, letterSpacing: '0.3px' },
  sectionSub: { fontSize: '12px', color: '#767676' },
  sectionSubReco: { fontSize: '12px', color: '#767676', margin: '0 0 18px' },
  recoEmpty: { fontSize: '13px', color: '#767676', margin: 0, padding: '10px 0' },
  carouselArrows: { display: 'flex', gap: '8px' },
  carouselArrowBtn: { width: 32, height: 32, borderRadius: '50%', border: '1px solid #1A1A1A', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  carousel: { display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '6px' },
  carouselItem: { flex: '0 0 auto', width: '240px' },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '18px 14px', borderBottom: '1px solid #E0E0E0', paddingBottom: '8px', marginBottom: '4px' },
  card: { position: 'relative', display: 'flex', flexDirection: 'column' },
  aiTag: { position: 'absolute', top: 10, left: 10, zIndex: 5, color: '#fff', fontSize: '9px', fontWeight: 700, letterSpacing: '0.5px', padding: '3px 8px', borderRadius: '2px' },
  saleTag: { position: 'absolute', top: 10, right: 10, zIndex: 5, background: '#E5231B', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 7px', borderRadius: '2px' },
  imgWrap: { overflow: 'hidden', background: '#F5F5F5', borderRadius: '2px' },
  img: { width: '100%', height: '280px', objectFit: 'cover', display: 'block' },
  cardBody: { padding: '12px 2px' },
  matchWrap: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' },
  matchTrack: { flex: 1, height: '4px', background: '#e5e5e5', borderRadius: '2px', overflow: 'hidden' },
  matchFill: { height: '100%', background: '#E5231B' },
  matchLabel: { fontSize: '10px', fontWeight: 700, color: '#E5231B', whiteSpace: 'nowrap' },
  priceRow: { display: 'flex', alignItems: 'baseline', gap: '8px' },
  price: { fontSize: '15px', fontWeight: 800 },
  originalPrice: { fontSize: '12px', color: '#999', textDecoration: 'line-through' },
  cardTitle: { fontSize: '12.5px', color: '#4a4a4a', height: '34px', overflow: 'hidden', margin: '4px 0 10px', lineHeight: 1.3 },
  cardBtn: { width: '100%', padding: '10px', cursor: 'pointer', fontSize: '11px', fontWeight: 700, letterSpacing: '0.5px', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' },

  pagination: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', padding: '32px 0 10px' },
  pageBtn: { display: 'flex', alignItems: 'center', gap: '6px', padding: '11px 20px', cursor: 'pointer', fontSize: '12px', fontWeight: 700, letterSpacing: '0.5px', borderRadius: '2px' },
  pageInfo: { fontSize: '13px', fontWeight: 700, color: '#555' },
};