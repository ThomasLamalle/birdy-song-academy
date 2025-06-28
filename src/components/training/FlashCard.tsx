import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Bird } from '@/types/bird';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Music, Volume2, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useBirdExperience } from '@/hooks/useBirdExperience';
import ExperienceBar from './ExperienceBar';

interface FlashCardProps {
  bird: Bird;
  isSoundMode: boolean;
  onNext: () => void;
  onPrevious: () => void;
}

export interface FlashCardRef {
  resetToFront: () => void;
}

const FlashCard = forwardRef<FlashCardRef, FlashCardProps>(({ bird: initialBird, isSoundMode, onNext, onPrevious }, ref) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { bird, handleCorrectAnswer, handleIncorrectAnswer, hasGainedExperience } = useBirdExperience(initialBird);

  // Reset to front when bird changes
  useEffect(() => {
    setIsFlipped(false);
  }, [initialBird.id]);

  useImperativeHandle(ref, () => ({
    resetToFront: () => {
      setIsFlipped(false);
    }
  }));

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const playSound = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
        console.error("Audio source:", bird.sound_path);

        // Fallback mechanism
        toast({
          title: "Erreur de lecture",
          description: "Impossible de lire le son. Veuillez vérifier le format ou réessayer.",
          variant: "destructive"
        });
      });
      setIsPlaying(true);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
    onNext();
  };

  const handlePrevious = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
    onPrevious();
  };

  const onCorrect = () => {
    handleCorrectAnswer();
  };

  const onIncorrect = () => {
    handleIncorrectAnswer();
  };

  const getSoundInfo = () => {
    if (!bird.soundMetadata) return null;

    return (
      <div className="text-xs text-center text-muted-foreground mt-2">
        <p>Type: {bird.soundMetadata.type}</p>
        {bird.id && <p>ID: XC{bird.id}</p>}
      </div>
    );
  };

  return (
    <div className="w-full mx-auto px-2">
      {/* Navigation and FlashCard Container */}
      <div className="relative flex items-center justify-center">
        {/* Left Navigation Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 z-10 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-md"
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Précédent</span>
        </Button>

        {/* Card Container - Expanded size */}
        <div className={`card-flip-container ${isMobile ? 'h-[500px]' : 'h-96'} w-full max-w-md mx-auto`}>
          <div className={`card-flip ${isFlipped ? 'flipped' : ''}`}>
            {/* Front of card */}
            <div
              className="card-front rounded-xl shadow-lg bg-white dark:bg-slate-800 overflow-hidden border border-muted"
              onClick={handleFlip}
            >
              <div className="p-4 flex flex-col items-center justify-center h-full">
                {isSoundMode ? (
                  <>
                    <div className={`${isMobile ? 'w-40 h-40' : 'w-32 h-32'} rounded-full bg-birdy-blue-light flex items-center justify-center mb-4`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`${isMobile ? 'h-28 w-28' : 'h-20 w-20'} rounded-full bg-birdy-blue hover:bg-birdy-blue-dark text-white`}
                        onClick={(e) => {
                          e.stopPropagation();
                          playSound();
                        }}
                      >
                        {isPlaying ? (
                          <Volume2 className={`${isMobile ? 'h-12 w-12' : 'h-10 w-10'}`} />
                        ) : (
                          <Music className={`${isMobile ? 'h-12 w-12' : 'h-10 w-10'}`} />
                        )}
                      </Button>
                    </div>
                    <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
                      Écoutez le chant et essayez d'identifier l'oiseau
                    </p>
                    {isSoundMode && bird.sound_path && getSoundInfo()}
                  </>
                ) : (
                  <>
                    <div className={`w-full ${isMobile ? 'h-72' : 'h-48'} bg-gray-200 dark:bg-gray-700 mb-4 rounded-md overflow-hidden`}>
                      {bird.image_path && (
                        <img
                          src={bird.image_path}
                          alt="Oiseau à identifier"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/birds/placeholder.jpg';
                          }}
                        />
                      )}
                    </div>
                    <p className="text-center text-gray-600 dark:text-gray-300">
                      Observez l'oiseau et essayez de l'identifier
                    </p>
                  </>
                )}
                <p className="text-sm text-center text-muted-foreground mt-4">
                  Appuyez pour voir la réponse
                </p>
              </div>
            </div>

            {/* Back of card */}
            <div
              className="card-back rounded-xl shadow-lg bg-white dark:bg-slate-800 overflow-hidden border border-muted"
              onClick={handleFlip}
            >
              <div className="p-4 flex flex-col h-full relative">
                {/* Experience Bar */}
                <div className="mb-3">
                  <ExperienceBar
                    level={bird.level}
                    experience={bird.experience}
                    experienceToNextLevel={bird.experienceToNextLevel}
                  />
                </div>

                <div className={`w-full ${isMobile ? 'h-48' : 'h-32'} bg-gray-200 dark:bg-gray-700 mb-3 rounded-md overflow-hidden`}>
                  <img
                    src={bird.image_path}
                    alt={bird.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/birds/placeholder.jpg';
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{bird.name}</h3>
                <p className="text-sm italic text-gray-500 dark:text-gray-400 mb-2">{bird.scientificName}</p>

                {!isSoundMode && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mb-2 flex items-center gap-1 visible"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound();
                    }}
                  >
                    {isPlaying ? (
                      <>
                        <Volume2 className="h-3 w-3" /> Arrêter le chant
                      </>
                    ) : (
                      <>
                        <Music className="h-3 w-3" /> Écouter le chant
                      </>
                    )}
                  </Button>
                )}

                {bird.sound_path && getSoundInfo()}

                {/* Answer buttons */}
                <div className="flex gap-2 mt-3">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCorrect();
                    }}
                    className={`flex-1 text-white ${hasGainedExperience
                      ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed'
                      : 'bg-green-500 hover:bg-green-600'
                    }`}
                    size="sm"
                    disabled={hasGainedExperience}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Correct
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onIncorrect();
                    }}
                    variant="outline"
                    className={`flex-1 ${hasGainedExperience
                      ? 'border-gray-400 text-gray-400 hover:bg-gray-50 cursor-not-allowed'
                      : 'border-red-500 text-red-500 hover:bg-red-50'
                    }`}
                    size="sm"
                    disabled={hasGainedExperience}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Incorrect
                  </Button>
                </div>

                {hasGainedExperience && (
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Passez à la carte suivante pour continuer à gagner de l'XP
                  </p>
                )}

                <p className="text-sm text-center text-muted-foreground mt-auto">
                  Appuyez pour retourner la carte
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Navigation Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 z-10 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-md"
          onClick={handleNext}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Suivant</span>
        </Button>
      </div>

      <audio
        ref={audioRef}
        src={bird.sound_path}
        onEnded={handleAudioEnded}
        preload="auto"
        onError={(e) => {
          console.error("Audio playback error:", e);
          console.error("Audio source:", bird.sound_path);
          console.error("Audio path:", audioRef.current?.src);
        }}
      />
    </div>
  );
});

FlashCard.displayName = "FlashCard";

export default FlashCard;
