import React from 'react';
import NavBar from './NavBar';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className={`flex-1 container mx-auto pb-20 ${isMobile ? 'max-w-[calc(100%-4rem)] px-2 ml-16' : 'max-w-[calc(100%-4rem)] px-4 ml-16'}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
