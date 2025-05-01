import React, { useState, useRef } from 'react';
import { Bird } from '@/types/bird';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Music, Volume2 } from 'lucide-react';

interface FlashCardProps {
  bird: Bird;
  isSoundMode: boolean;
  onNext: () => void;
}

const FlashCard = ({ bird, isSoundMode, onNext }: FlashCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

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
        console.error("Audio source:", bird.sound);

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
    setIsFlipped(false);
    onNext();
  };

  const getSoundInfo = () => {
    if (!bird.soundMetadata) return null;

    return (
      <div className="text-xs text-center text-muted-foreground mt-2">
        <p>Type: {bird.soundMetadata.type}</p>
        {bird.soundFileId && <p>ID: XC{bird.soundFileId}</p>}
      </div>
    );
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="card-flip-container h-80 w-full">
        <div className={`card-flip ${isFlipped ? 'flipped' : ''}`}>
          {/* Front of card */}
          <div
            className="card-front rounded-xl shadow-lg bg-white dark:bg-slate-800 overflow-hidden border border-muted"
            onClick={handleFlip}
          >
            <div className="p-4 flex flex-col items-center justify-center h-full">
              {isSoundMode ? (
                <>
                  <div className="w-32 h-32 rounded-full bg-birdy-blue-light flex items-center justify-center mb-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-20 w-20 rounded-full bg-birdy-blue hover:bg-birdy-blue-dark text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        playSound();
                      }}
                    >
                      {isPlaying ? (
                        <Volume2 className="h-10 w-10" />
                      ) : (
                        <Music className="h-10 w-10" />
                      )}
                    </Button>
                  </div>
                  <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
                    Écoutez le chant et essayez d'identifier l'oiseau
                  </p>
                  {isSoundMode && bird.soundMetadata && getSoundInfo()}
                </>
              ) : (
                <>
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 mb-4 rounded-md overflow-hidden">
                    {bird.image && (
                      <img
                        src={bird.image}
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
            <div className="p-4 flex flex-col items-center h-full relative">
              <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 mb-4 rounded-md overflow-hidden">
                <img
                  src={bird.image}
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
                  className="mb-2 flex items-center gap-1"
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
              {bird.soundMetadata && getSoundInfo()}
              <p className="text-sm text-center text-muted-foreground mt-auto">
                Appuyez pour retourner la carte
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <Button onClick={handleNext} className="bg-birdy-green hover:bg-birdy-green-dark">
          Carte suivante
        </Button>
      </div>

      <audio
        ref={audioRef}
        src={bird.sound}
        onEnded={handleAudioEnded}
        preload="auto"
        onError={(e) => {
          console.error("Audio playback error:", e);
          console.error("Audio source:", bird.sound);
          console.error("Audio path:", audioRef.current?.src);
        }}
      />
    </div>
  );
};

export default FlashCard;
