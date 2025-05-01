
import React from 'react';
import { Link } from 'react-router-dom';
import { Bird, Book, Music, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NavBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 shadow-lg border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-around items-center h-16">
        <NavButton to="/" icon={<Music className="h-5 w-5" />} label="Entraînement" />
        <NavButton to="/quiz" icon={<Search className="h-5 w-5" />} label="Évaluation" />
        <NavButton to="/library" icon={<Bird className="h-5 w-5" />} label="BirdyDex" />
        <NavButton to="/identification-key" icon={<Book className="h-5 w-5" />} label="Clef" />
      </div>
    </nav>
  );
};

interface NavButtonProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavButton = ({ to, icon, label }: NavButtonProps) => {
  return (
    <Link to={to}>
      <Button variant="ghost" className="flex flex-col items-center py-1 h-full">
        {icon}
        <span className="text-xs mt-1">{label}</span>
      </Button>
    </Link>
  );
};

export default NavBar;
