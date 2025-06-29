import { Footer } from '@/widgets/footer';
import { AppBar } from '@/widgets/header';
import React from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AppBar />
      {children}
      <div className="pt-[6.25rem]">
        <Footer />
      </div>
    </div>
  );
}
