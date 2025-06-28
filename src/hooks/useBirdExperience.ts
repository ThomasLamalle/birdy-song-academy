
import { useState, useCallback } from 'react';
import { Bird } from '@/types/bird';
import { useToast } from '@/hooks/use-toast';

export const useBirdExperience = (initialBird: Bird) => {
  const [bird, setBird] = useState<Bird>(initialBird);
  const { toast } = useToast();

  const handleCorrectAnswer = useCallback(() => {
    setBird(prevBird => {
      const experienceGained = 20; // Base experience gain
      const newExperience = prevBird.experience + experienceGained;
      const newCorrectGuesses = prevBird.correctGuesses + 1;
      const newTotalGuesses = prevBird.totalGuesses + 1;

      // Check if leveling up
      if (newExperience >= prevBird.experienceToNextLevel) {
        const newLevel = prevBird.level + 1;
        const remainingExp = newExperience - prevBird.experienceToNextLevel;
        const newExpToNextLevel = Math.floor(prevBird.experienceToNextLevel * 1.2); // Increase requirement by 20%

        toast({
          title: "Niveau supérieur !",
          description: `${prevBird.name} est maintenant niveau ${newLevel} !`,
        });

        return {
          ...prevBird,
          level: newLevel,
          experience: remainingExp,
          experienceToNextLevel: newExpToNextLevel,
          correctGuesses: newCorrectGuesses,
          totalGuesses: newTotalGuesses,
        };
      }

      toast({
        title: "Bonne réponse !",
        description: `+${experienceGained} XP pour ${prevBird.name}`,
      });

      return {
        ...prevBird,
        experience: newExperience,
        correctGuesses: newCorrectGuesses,
        totalGuesses: newTotalGuesses,
      };
    });
  }, [toast]);

  const handleIncorrectAnswer = useCallback(() => {
    setBird(prevBird => ({
      ...prevBird,
      totalGuesses: prevBird.totalGuesses + 1,
    }));

    toast({
      title: "Mauvaise réponse",
      description: "Continuez à vous entraîner !",
      variant: "destructive",
    });
  }, [toast]);

  return {
    bird,
    handleCorrectAnswer,
    handleIncorrectAnswer,
  };
};
