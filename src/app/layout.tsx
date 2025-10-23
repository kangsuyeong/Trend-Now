import type { Metadata } from 'next';
import './globals.css';
import QueryProvider from '@/providers/query-provider';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/next';

const pretendard = localFont({
  src: '../../static/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

const himpun = localFont({
  src: '../../static/fonts/Himpun.otf',
  display: 'swap',
  weight: '400',
  variable: '--font-himpun',
});

export const metadata: Metadata = {
  title: 'Trendnow',
  description: '트렌드나우 - 실시간 인기 검색어 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pretendard.variable} ${himpun.variable}`}
      style={{ scrollbarGutter: 'stable' }}
    >
      <body className="relative font-pretendard antialiased">
        <QueryProvider>{children}</QueryProvider>
        <div id="modal-root" />
        <Analytics />
      </body>
    </html>
  );
}
