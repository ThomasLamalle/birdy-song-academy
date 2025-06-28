
import { useState, useCallback, useEffect } from 'react';
import { Bird } from '@/types/bird';
import { useToast } from '@/hooks/use-toast';

export const useBirdExperience = (initialBird: Bird) => {
  const [bird, setBird] = useState<Bird>(initialBird);
  const [hasGainedExperience, setHasGainedExperience] = useState(false);
  const { toast } = useToast();

  // Reset experience gain flag when bird changes
  useEffect(() => {
    setHasGainedExperience(false);
  }, [initialBird.id]);

  // Update bird when initialBird changes
  useEffect(() => {
    setBird(initialBird);
  }, [initialBird]);

  const handleCorrectAnswer = useCallback(() => {
    if (hasGainedExperience) {
      toast({
        title: "Déjà répondu !",
        description: "Vous avez déjà répondu correctement à cette carte. Passez à la suivante pour gagner plus d'XP.",
        variant: "destructive",
      });
      return;
    }

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

        setTimeout(() => {
          toast({
            title: "Niveau supérieur !",
            description: `${prevBird.name} est maintenant niveau ${newLevel} !`,
          });
        }, 0);

        return {
          ...prevBird,
          level: newLevel,
          experience: remainingExp,
          experienceToNextLevel: newExpToNextLevel,
          correctGuesses: newCorrectGuesses,
          totalGuesses: newTotalGuesses,
        };
      }

      setTimeout(() => {
        toast({
          title: "Bonne réponse !",
          description: `+${experienceGained} XP pour ${prevBird.name}`,
        });
      }, 0);

      return {
        ...prevBird,
        experience: newExperience,
        correctGuesses: newCorrectGuesses,
        totalGuesses: newTotalGuesses,
      };
    });

    setHasGainedExperience(true);
  }, [hasGainedExperience, toast]);

  const handleIncorrectAnswer = useCallback(() => {
    if (hasGainedExperience) {
      toast({
        title: "Déjà répondu !",
        description: "Vous avez déjà répondu à cette carte. Passez à la suivante pour continuer.",
        variant: "destructive",
      });
      return;
    }

    setBird(prevBird => ({
      ...prevBird,
      totalGuesses: prevBird.totalGuesses + 1,
    }));

    setTimeout(() => {
      toast({
        title: "Mauvaise réponse",
        description: "Continuez à vous entraîner !",
        variant: "destructive",
      });
    }, 0);

    setHasGainedExperience(true);
  }, [hasGainedExperience, toast]);

  return {
    bird,
    handleCorrectAnswer,
    handleIncorrectAnswer,
    hasGainedExperience,
  };
};
