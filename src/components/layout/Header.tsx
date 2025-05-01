
import React from 'react';
import { Feather } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center pt-6 pb-4">
      <div className="flex items-center gap-2">
        <Feather className="h-7 w-7 text-birdy-green" />
        <h1 className="text-2xl font-display font-bold text-birdy-green">{title}</h1>
      </div>
      {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  );
};

export default Header;
