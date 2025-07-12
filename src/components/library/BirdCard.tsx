
import React, { useState, useRef } from 'react';
import { Bird } from '@/types/bird';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Music, Volume2 } from 'lucide-react';

interface BirdCardProps {
  bird: Bird;
}

const BirdCard = ({ bird }: BirdCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const playSound = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(error => {
        toast({
          title: "Erreur de lecture",
          description: "Impossible de lire le son. Veuillez réessayer.",
          variant: "destructive"
        });
        console.error("Error playing audio:", error);
      });
      setIsPlaying(true);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const calculateMasteryPercentage = () => {
    if (bird.totalGuesses === 0) return 0;
    return Math.round((bird.correctGuesses / bird.totalGuesses) * 100);
  };

  const getMasteryLevelName = () => {
    const percentage = calculateMasteryPercentage();

    if (bird.totalGuesses < 3) return "Nouveau";
    if (percentage >= 90) return "Maître";
    if (percentage >= 70) return "Expert";
    if (percentage >= 50) return "Intermédiaire";
    return "Débutant";
  };

  const getMasteryLevelColor = () => {
    const percentage = calculateMasteryPercentage();

    if (bird.totalGuesses < 3) return "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    if (percentage >= 90) return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    if (percentage >= 70) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    if (percentage >= 50) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
  };

  return (
    <Card className="w-full overflow-hidden">
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <img
          src={bird.image_path}
          alt={bird.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            console.error(`Error loading image for bird: ${bird.image_path}, path: ${bird.image_path}`);
            target.src = '/birds/placeholder.jpg';
          }}
        />
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{bird.name}</CardTitle>
            <p className="text-sm italic text-muted-foreground">{bird.scientificName}</p>
          </div>
          <Badge variant="outline" className={getMasteryLevelColor()}>
            {getMasteryLevelName()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
          <div className="space-y-3">
            <p className="text-sm">{bird.description}</p>

            

            

            {bird.totalGuesses > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-1">Statistiques</h4>
                <div className="text-sm">
                  <span className="font-medium">Précision:</span> {calculateMasteryPercentage()}%
                </div>
                <div className="text-sm">
                  <span className="font-medium">Quiz complétés:</span> {bird.totalGuesses}
                </div>
              </div>
            )}

            <div>
              <h4 className="text-sm font-medium mb-1">Progression</h4>
              <div className="text-sm">
                <span className="font-medium">Niveau:</span> {bird.level}
              </div>
              <div className="text-sm">
                <span className="font-medium">Expérience:</span> {bird.experience} / {bird.experienceToNextLevel}
              </div>
            </div>

            {bird.soundMetadata && (
              <div>
                <h4 className="text-sm font-medium mb-1">Enregistrement</h4>
                <div className="text-[0.65rem] flex flex-wrap gap-x-2">
                  <span className="font-medium">Type:</span> {bird.soundMetadata.type}
                  {bird.soundMetadata.country && <span><span className="font-medium">Pays:</span> {bird.soundMetadata.country}</span>}
                  {bird.soundMetadata.recordingProvider && <span><span className="font-medium">Crédit:</span> {bird.soundMetadata.recordingProvider}</span>}
                </div>
              </div>
            )}
          </div>
      </CardContent>

      <CardFooter className="flex justify-end pt-0">
        <Button
          onClick={playSound}
          size="sm"
          className="text-xs bg-birdy-blue hover:bg-birdy-blue-dark flex items-center gap-1"
        >
          {isPlaying ? (
            <>
              <Volume2 className="h-3 w-3" /> Arrêter
            </>
          ) : (
            <>
              <Music className="h-3 w-3" /> Écouter
            </>
          )}
        </Button>
      </CardFooter>

      <audio
        ref={audioRef}
        src={bird.sound_path}
        onEnded={handleAudioEnded}
        preload="auto"
      />
    </Card>
  );
};

export default BirdCard;
