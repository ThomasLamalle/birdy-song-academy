
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Header from '@/components/layout/Header';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import QuizResults from '@/components/quiz/QuizResults';
import { birds, getRandomBirds, getQuizBirds } from '@/data/birds';

const QUIZ_LENGTH = 10;
const OPTIONS_COUNT = 4;

const QuizPage = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizBirds, setQuizBirds] = useState<Array<{
    correctBird: typeof birds[0],
    options: typeof birds
  }>>([]);
  
  useEffect(() => {
    prepareQuiz();
  }, []);

  const prepareQuiz = () => {
    // Get random birds for the quiz
    const selectedBirds = getRandomBirds(QUIZ_LENGTH);
    
    // Create quiz questions with options
    const newQuizBirds = selectedBirds.map(bird => ({
      correctBird: bird,
      options: getQuizBirds(bird, OPTIONS_COUNT)
    }));
    
    setQuizBirds(newQuizBirds);
    setCurrentQuestion(0);
    setScore(0);
    setQuizStarted(false);
    setQuizFinished(false);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScore(score + 1);
      
      // Update bird stats
      const currentBird = quizBirds[currentQuestion].correctBird;
      currentBird.correctGuesses += 1;
      currentBird.totalGuesses += 1;
    } else {
      // Update bird stats
      const currentBird = quizBirds[currentQuestion].correctBird;
      currentBird.totalGuesses += 1;
    }
    
    if (currentQuestion < QUIZ_LENGTH - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    prepareQuiz();
  };

  if (!quizStarted) {
    return (
      <Layout>
        <Header 
          title="Évaluation" 
          subtitle="Testez vos connaissances sur les chants d'oiseaux"
        />
        <div className="flex flex-col items-center justify-center py-8">
          <div className="max-w-md text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Prêt à tester vos connaissances ?</h2>
            <p className="text-muted-foreground mb-6">
              Ce quiz comporte {QUIZ_LENGTH} questions. Écoutez le chant de l'oiseau et sélectionnez la bonne réponse parmi les {OPTIONS_COUNT} choix.
            </p>
            <button 
              onClick={startQuiz}
              className="bg-birdy-green text-white px-6 py-3 rounded-md font-medium hover:bg-birdy-green-dark transition-colors"
            >
              Commencer le quiz
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (quizFinished) {
    return (
      <Layout>
        <Header 
          title="Résultats" 
          subtitle="Votre score pour ce quiz"
        />
        <QuizResults 
          score={score}
          totalQuestions={QUIZ_LENGTH}
          onRestart={restartQuiz}
        />
      </Layout>
    );
  }

  const currentQuizQuestion = quizBirds[currentQuestion];

  return (
    <Layout>
      <Header 
        title="Évaluation" 
        subtitle="Identifiez l'oiseau par son chant"
      />
      <QuizQuestion 
        correctBird={currentQuizQuestion.correctBird}
        options={currentQuizQuestion.options}
        onAnswer={handleAnswer}
        questionNumber={currentQuestion + 1}
        totalQuestions={QUIZ_LENGTH}
      />
    </Layout>
  );
};

export default QuizPage;
