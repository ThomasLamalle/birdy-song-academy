import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Header from '@/components/layout/Header';
import FlashCard from '@/components/training/FlashCard';
import ModeToggle from '@/components/training/ModeToggle';
import { birds, getRandomBirds } from '@/data/birds';
import { Shuffle } from 'lucide-react';

const IndexPage = () => {
  const [isSoundMode, setIsSoundMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledBirds, setShuffledBirds] = useState([...birds]);

  useEffect(() => {
    // Mélanger les oiseaux au chargement initial
    const shuffled = [...birds].sort(() => Math.random() - 0.5);
    setShuffledBirds(shuffled);
    setCurrentIndex(0);
  }, []);

  const toggleMode = () => {
    setIsSoundMode(!isSoundMode);
  };

  const shuffleBirds = () => {
    const shuffled = [...birds].sort(() => Math.random() - 0.5);
    setShuffledBirds(shuffled);
    setCurrentIndex(0);
  };

  const goToNext = () => {
    // Passer à l'oiseau suivant, ou revenir au début si nous sommes à la fin
    setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledBirds.length);
  };

  const goToPrevious = () => {
    // Passer à l'oiseau précédent, ou aller à la fin si nous sommes au début
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? shuffledBirds.length - 1 : prevIndex - 1
    );
  };

  return (
    <Layout>
      <Header
        title="Birdy"
        subtitle="Entraînez-vous à reconnaître les oiseaux"
      />


      <FlashCard
        bird={shuffledBirds[currentIndex]}
        isSoundMode={isSoundMode}
        onNext={goToNext}
        onPrevious={goToPrevious}
      />

      <div className="flex justify-center items-center mt-4">
        <ModeToggle isSoundMode={isSoundMode} onToggle={toggleMode} shuffleBirds={shuffleBirds} />
      </div>
    </Layout>
  );
};

export default IndexPage;
