import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-[51.5rem] py-16">{children}</div>;
}
