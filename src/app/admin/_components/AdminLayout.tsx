'use client';
import React, { useState } from 'react';
import Sidebar from '@/app/admin/_components/Sidebar';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="relative flex min-h-screen">
      <button
        className="fixed right-0 top-0 z-20 h-[48px] w-[48px] bg-blue-500 p-2 text-white md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? '×' : '≡'}
      </button>
      <div
        className={`fixed top-0 z-10 h-full w-full transition-transform duration-300 ease-in-out md:relative md:h-auto md:w-64 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} `}
      >
        <Sidebar />
      </div>
      <section className="flex-1 p-6 md:p-10 xl:p-14">{children}</section>
    </div>
  );
};
export default AdminLayout;
