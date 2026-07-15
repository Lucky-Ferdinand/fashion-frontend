import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, LogOut } from 'lucide-react';

function NavbarAdmin() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  // Menambahkan menu Dashboard di urutan pertama
  const menuItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Tren Product', path: '/admin/tren-product' },
    { name: 'Dynamic Pricing', path: '/admin/dynamic-pricing' },
    { name: 'Rating Produk', path: '/admin/rating-produk' },
    { name: 'Next Item Purchase', path: '/admin/next-purchase' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white px-6 md:px-10 py-4 flex items-center justify-between border-b border-gray-200">
      
      {/* Sisi Kiri: Logo & Menu Navigasi Berdekatan */}
      <div className="flex items-center gap-10">
        
        {/* Logo AF dengan penanda Admin */}
        <Link to="/admin" className="flex items-center shrink-0 gap-2">
          <div className="h-11 w-11 rounded-full border-[1.5px] border-[#7a1c22] flex items-center justify-center text-[#7a1c22] font-serif font-bold text-xl tracking-tighter">
            AF
          </div>
          <span className="text-[10px] font-bold bg-[#7a1c22] text-white px-1.5 py-0.5 rounded tracking-wide uppercase">
            Admin
          </span>
        </Link>

        {/* Menu Links Khusus Admin */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-[15px] font-medium transition-colors hover:text-black ${
                location.pathname === item.path ? 'text-black font-bold' : 'text-gray-700'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Sisi Kanan: Tombol Menu 3 Garis Tetap Ada & Tombol Logout */}
      <div className="flex items-center gap-5 text-black shrink-0">
        
        {/* Garis Pembatas Vertikal */}
        <div className="h-6 w-[1.5px] bg-gray-300 mx-1"></div>

        {/* Tombol Logout */}
        <button 
          onClick={handleLogout}
          title="Logout"
          className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-red-50 text-red-700 transition-colors cursor-pointer"
        >
          <LogOut size={24} strokeWidth={2} />
        </button>
      </div>

    </nav>
  );
}

export default NavbarAdmin;