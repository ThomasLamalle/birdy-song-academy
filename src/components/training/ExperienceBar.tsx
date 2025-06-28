
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ExperienceBarProps {
  level: number;
  experience: number;
  experienceToNextLevel: number;
}

const ExperienceBar = ({ level, experience, experienceToNextLevel }: ExperienceBarProps) => {
  const progressPercentage = (experience / experienceToNextLevel) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
          Niveau {level}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-500">
          {experience}/{experienceToNextLevel} XP
        </span>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
};

export default ExperienceBar;
