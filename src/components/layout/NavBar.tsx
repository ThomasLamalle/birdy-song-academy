import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bird, Book, IdCard, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const NavBar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  return (
    <nav className="fixed top-0 left-0 bottom-0 bg-white dark:bg-slate-800 shadow-lg border-r border-gray-200 dark:border-gray-700 w-24">
      <div className="flex flex-col justify-around items-center h-full">
        <NavButton
          to="/"
          icon={<IdCard className="h-5 w-5" />}
          label="Flash Cards"
          active={location.pathname === '/'}
          isMobile={isMobile}
        />
        <NavButton
          to="/quiz"
          icon={<Search className="h-5 w-5" />}
          label="Quiz"
          active={location.pathname === '/quiz'}
          isMobile={isMobile}
        />
        <NavButton
          to="/library"
          icon={<Bird className="h-5 w-5" />}
          label="BirdyDex"
          active={location.pathname === '/library'}
          isMobile={isMobile}
        />
      </div>
    </nav>
  );
};

interface NavButtonProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  isMobile: boolean;
}

const NavButton = ({ to, icon, label, active, isMobile }: NavButtonProps) => {
  return (
    <Link to={to} className="flex-1">
      <Button
        variant="ghost"
        className={`flex flex-col items-center justify-center py-1 h-full w-full rounded-none ${active ? 'bg-background text-primary' : ''
          }`}
      >
        {icon}
        <span className={`mt-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>{label}</span>
      </Button>
    </Link>
  );
};

export default NavBar;
