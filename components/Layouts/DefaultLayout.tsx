'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Sidebar from '@/components/Sidebar/Sidebar';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="md:flex md:gap-6">
        <Sidebar />
        <div className="flex-1 min-w-0 w-full px-3 md:px-6">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
