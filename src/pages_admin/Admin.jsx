import React from 'react';
import DashboardAdmin from './DashboardAdmin'; // Import halaman utama dashboard admin
import DynamicPricing from './DynamicPricing';
import TrenProduct from './TrenProduct';
import NextItemPurchase from './NextItemPurchase';
import RatingProduk from './RatingProduk';

const Admin = ({ page }) => {
  const renderContent = () => {
    switch (page) {
      case 'tren':
        return <TrenProduct />; 
      case 'pricing':
        return <DynamicPricing />; 
      case 'next-purchase':
        return <NextItemPurchase />; 
      case 'rating':
        return <RatingProduk />; 
      default:
        // Render halaman Dashboard Admin secara otomatis pada halaman utama /admin
        return <DashboardAdmin />;
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Admin;