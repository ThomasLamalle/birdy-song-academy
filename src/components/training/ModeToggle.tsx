
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Music, Bird } from 'lucide-react';

interface ModeToggleProps {
  isSoundMode: boolean;
  onToggle: () => void;
}

const ModeToggle = ({ isSoundMode, onToggle }: ModeToggleProps) => {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="flex items-center space-x-2">
        <Bird className={`h-5 w-5 ${!isSoundMode ? 'text-birdy-green' : 'text-muted-foreground'}`}/>
        <Switch
          id="mode-toggle"
          checked={isSoundMode}
          onCheckedChange={onToggle}
          className="data-[state=checked]:bg-birdy-blue data-[state=unchecked]:bg-birdy-green"
        />
        <Music className={`h-5 w-5 ${isSoundMode ? 'text-birdy-blue' : 'text-muted-foreground'}`}/>
      </div>
      <Label htmlFor="mode-toggle" className="mt-2 text-sm text-center text-muted-foreground">
        {isSoundMode 
          ? "Mode chant : identifiez l'oiseau par son chant" 
          : "Mode visuel : identifiez l'oiseau par son apparence"
        }
      </Label>
    </div>
  );
};

export default ModeToggle;
