
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
      <main className={`flex-1 container mx-auto pb-20 ${isMobile ? 'max-w-full px-2' : 'max-w-md px-4'}`}>
        {children}
      </main>
      <NavBar />
    </div>
  );
};

export default Layout;
