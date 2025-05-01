
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Bird } from '@/types/bird';
import { useToast } from '@/hooks/use-toast';
import { Music, Volume2 } from 'lucide-react';

interface QuizQuestionProps {
  correctBird: Bird;
  options: Bird[];
  onAnswer: (correct: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
}

const QuizQuestion = ({
  correctBird,
  options,
  onAnswer,
  questionNumber,
  totalQuestions
}: QuizQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
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

  const handleOptionClick = (birdId: string) => {
    if (answered) return;

    setSelectedAnswer(birdId);
    setAnswered(true);

    const isCorrect = birdId === correctBird.id;

    if (isCorrect) {
      toast({
        title: "Correct !",
        description: `C'est bien un ${correctBird.name} !`,
        variant: "default",
        className: "bg-green-100 border-green-200 dark:bg-green-900 dark:border-green-800"
      });
    } else {
      toast({
        title: "Incorrect",
        description: `C'était un ${correctBird.name}`,
        variant: "default",
        className: "bg-red-100 border-red-200 dark:bg-red-900 dark:border-red-800"
      });
    }

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      }
      onAnswer(isCorrect);
      setSelectedAnswer(null);
      setAnswered(false);
    }, 1500);
  };

  const getButtonClass = (birdId: string) => {
    if (!answered) return "";

    if (birdId === correctBird.id) {
      return "border-green-500 bg-green-100 dark:bg-green-900";
    }

    if (birdId === selectedAnswer) {
      return "border-red-500 bg-red-100 dark:bg-red-900";
    }

    return "opacity-50";
  };

  return (
    <div className="w-full">
      <div className="mb-4 px-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground">
            Question {questionNumber}/{totalQuestions}
          </span>
          <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div
              className="h-full bg-birdy-blue rounded-full"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-birdy-blue-light flex items-center justify-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-16 w-16 rounded-full bg-birdy-blue hover:bg-birdy-blue-dark text-white"
            onClick={playSound}
          >
            {isPlaying ? (
              <Volume2 className="h-8 w-8" />
            ) : (
              <Music className="h-8 w-8" />
            )}
          </Button>
        </div>
        <h3 className="text-lg font-medium mb-2">Quel est cet oiseau ?</h3>
        <p className="text-sm text-center text-muted-foreground">
          Écoutez le chant et sélectionnez l'oiseau correspondant
        </p>
        {correctBird.id && (
          <p className="text-xs text-center text-muted-foreground mt-1">
            (ID: XC{correctBird.id})
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {options.map((bird) => (
          <Button
            key={bird.id}
            variant="outline"
            className={`h-auto py-3 flex flex-col items-center justify-between ${getButtonClass(bird.id)}`}
            onClick={() => handleOptionClick(bird.id)}
            disabled={answered}
          >
            <div className="w-full h-24 mb-2 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
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
            <span className="text-sm font-medium">{bird.name}</span>
          </Button>
        ))}
      </div>

      <audio
        ref={audioRef}
        src={correctBird.sound_path}
        onEnded={handleAudioEnded}
        preload="auto"
      />
    </div>
  );
};

export default QuizQuestion;
