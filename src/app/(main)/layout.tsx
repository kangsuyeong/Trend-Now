import { Footer } from '@/widgets/footer';
import { AppBar } from '@/widgets/header';
import React from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppBar />
      <main className="flex-1">{children}</main>
      <div className="pt-[6.25rem]">
        <Footer />
      </div>
    </div>
  );
}
