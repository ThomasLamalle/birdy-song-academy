
import React, { useState, useEffect, useRef } from 'react';
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
  const [seenIndices, setSeenIndices] = useState<number[]>([0]);
  const flashCardRef = useRef<{ resetToFront: () => void }>(null);

  useEffect(() => {
    // Mélanger les oiseaux au chargement initial
    const shuffled = [...birds].sort(() => Math.random() - 0.5);
    setShuffledBirds(shuffled);
    setCurrentIndex(0);
    setSeenIndices([0]);
  }, []);

  const toggleMode = () => {
    setIsSoundMode(!isSoundMode);
  };

  const shuffleBirds = () => {
    const shuffled = [...birds].sort(() => Math.random() - 0.5);
    setShuffledBirds(shuffled);
    setCurrentIndex(0);
    // Reset card to front when shuffling
    if (flashCardRef.current) {
      flashCardRef.current.resetToFront();
    }
  };

  const goToNext = () => {
    // Reset card to front before changing bird
    if (flashCardRef.current) {
      flashCardRef.current.resetToFront();
    }

    // Si on a déjà vu tous les oiseaux, recommencer avec un nouveau mélange
    if (seenIndices.length >= birds.length) {
      const shuffled = [...birds].sort(() => Math.random() - 0.5);
      setShuffledBirds(shuffled);
      setCurrentIndex(0);
      setSeenIndices([0]);
      return;
    }

    // Trouver un index d'oiseau qui n'a pas encore été vu
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * birds.length);
    } while (seenIndices.includes(nextIndex));

    setCurrentIndex(nextIndex);
    setSeenIndices([...seenIndices, nextIndex]);
  };

  const goToPrevious = () => {
    // Reset card to front before changing bird
    if (flashCardRef.current) {
      flashCardRef.current.resetToFront();
    }

    // Si nous sommes au début ou s'il n'y a qu'un seul oiseau vu, ne rien faire
    if (seenIndices.length <= 1) return;

    // Revenir à l'oiseau précédent
    const previousIndices = [...seenIndices];
    previousIndices.pop(); // Enlever l'index actuel
    const prevIndex = previousIndices[previousIndices.length - 1]; // Prendre le dernier index restant

    setCurrentIndex(prevIndex);
    setSeenIndices(previousIndices);
  };

  return (
    <Layout>
      <Header
        title="Birdy"
        subtitle="Entraînez-vous à reconnaître les oiseaux"
      />

      <FlashCard
        ref={flashCardRef}
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
