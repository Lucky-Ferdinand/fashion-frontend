import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, Menu, User } from 'lucide-react';

function Navbar() {
  const location = useLocation();

  // Cek status login dari sessionStorage
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Klasifikasi', path: '/klasifikasi' },
    { name: 'Katalog', path: '/katalog' },
    { name: 'Tentang Kami', path: '/tentang-kami' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white px-6 md:px-10 py-4 flex items-center justify-between border-b border-gray-200">
      
      {/* Sisi Kiri: Logo & Menu Navigasi Berdekatan */}
      <div className="flex items-center gap-10">
        
        {/* Logo AF */}
        <Link to="/" className="flex items-center shrink-0">
          <div className="h-11 w-11 rounded-full border-[1.5px] border-[#7a1c22] flex items-center justify-center text-[#7a1c22] font-serif font-bold text-xl tracking-tighter">
            AF
          </div>
        </Link>

        {/* Menu Links */}
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

      {/* Sisi Kanan: Ikon Navigasi & Ikon User */}
      <div className="flex items-center gap-5 text-black shrink-0">
        
        
        {/* Garis Pembatas Vertikal */}
        <div className="h-6 w-[1.5px] bg-gray-300 mx-1"></div>

        {/* Tombol User Dinamis */}
        <Link 
          to={isLoggedIn ? "/admin" : "/login"} 
          className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition-colors text-black"
        >
          <User size={24} strokeWidth={2} />
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;