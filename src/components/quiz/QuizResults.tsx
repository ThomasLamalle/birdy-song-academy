
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const QuizResults = ({ score, totalQuestions, onRestart }: QuizResultsProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let message = "";
  let emoji = "";
  
  if (percentage === 100) {
    message = "Parfait ! Vous êtes un expert !";
    emoji = "🏆";
  } else if (percentage >= 80) {
    message = "Excellent ! Vous connaissez bien les oiseaux !";
    emoji = "🎉";
  } else if (percentage >= 60) {
    message = "Bien joué ! Votre connaissance des oiseaux est bonne.";
    emoji = "👍";
  } else if (percentage >= 40) {
    message = "Pas mal ! Continuez à vous entraîner.";
    emoji = "🙂";
  } else {
    message = "Continuez à apprendre les chants d'oiseaux !";
    emoji = "📚";
  }
  
  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 border border-muted">
      <div className="text-center mb-6">
        <span className="text-5xl mb-4 block">{emoji}</span>
        <h2 className="text-2xl font-bold mb-2">Résultats du quiz</h2>
        <p className="text-muted-foreground">{message}</p>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="font-medium">Score</span>
          <span className="font-bold">{score}/{totalQuestions}</span>
        </div>
        <Progress value={percentage} className="h-3" />
        <div className="text-right mt-1">
          <span className="text-sm font-medium text-muted-foreground">{percentage}%</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-3">
        <Button onClick={onRestart} className="bg-birdy-green hover:bg-birdy-green-dark">
          Recommencer le quiz
        </Button>
        <Button variant="outline" onClick={() => window.location.href = '/'}>
          Retourner à l'entraînement
        </Button>
      </div>
    </div>
  );
};

export default QuizResults;
