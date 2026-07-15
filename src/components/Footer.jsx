import React from 'react';

function Footer() {
  return (
    <footer className="w-full bg-[#dcdcdc] px-8 md:px-24 py-6 flex flex-col md:flex-row items-center justify-between border-t border-gray-400">
      
      {/* Sisi Kiri: Teks Hak Cipta */}
      <div className="text-[#5a5a5a] text-sm md:text-base font-bold tracking-wide mb-4 md:mb-0">
        Hak Cipta © 23 Teknik Informatika C. Semua hak dilindungi undang-undang.
      </div>

      {/* Sisi Kanan: Ikon Media Sosial (SVG Murni) */}
      <div className="flex items-center gap-6 text-black">
        
        {/* Logo Instagram */}
        <a href="#instagram" className="hover:text-gray-500 transition-colors duration-200" aria-label="Instagram">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>

        {/* Logo YouTube */}
        <a href="#youtube" className="hover:text-gray-500 transition-colors duration-200" aria-label="YouTube">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
          </svg>
        </a>

        {/* Logo WhatsApp Asli */}
        <a href="#whatsapp" className="hover:text-gray-500 transition-colors duration-200" aria-label="WhatsApp">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        </a>

        {/* Logo Mail */}
        <a href="#email" className="hover:text-gray-500 transition-colors duration-200" aria-label="Email">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </a>

      </div>
    </footer>
  );
}

export default Footer;