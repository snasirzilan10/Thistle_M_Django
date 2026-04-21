import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import { Toaster } from 'react-hot-toast';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />   {/* ← This is what fixes the 'children' error in App.tsx */}
      </main>
      <Footer />

      {/* Top 0.01% Global Toaster – used by FAANG e-commerce apps */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '10px',
            fontSize: '15px',
            padding: '16px 20px',
          },
        }}
      />
    </div>
  );
};

export default MainLayout;