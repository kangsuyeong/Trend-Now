import { MenuBar } from '@/widgets/header';
import { TrendBar } from '@/widgets/sideBar';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <MenuBar />
      <div className="flex w-full justify-center gap-x-12 px-8">
        <div className="max-w-[52.5rem] flex-1">{children}</div>
        <div className="flex h-[400px] max-w-[22.5rem] flex-1 flex-col gap-y-3">
          <TrendBar />
        </div>
      </div>
    </div>
  );
}
