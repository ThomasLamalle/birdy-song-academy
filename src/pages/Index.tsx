import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Header from '@/components/layout/Header';
import FlashCard from '@/components/training/FlashCard';
import ModeToggle from '@/components/training/ModeToggle';
import { birds, getRandomBirds } from '@/data/birds';

const IndexPage = () => {
  const [isSoundMode, setIsSoundMode] = useState(false);
  const [currentBird, setCurrentBird] = useState(birds[0]);
  const [seenBirds, setSeenBirds] = useState<string[]>([]);

  useEffect(() => {
    getNextBird();
  }, []);

  const toggleMode = () => {
    setIsSoundMode(!isSoundMode);
  };

  const getNextBird = () => {
    // Get a random bird that hasn't been seen
    let unseenBirds = birds.filter(bird => !seenBirds.includes(bird.id));

    // Reset seen birds if all birds have been seen
    if (unseenBirds.length === 0) {
      setSeenBirds([]);
      unseenBirds = birds; // Reset unseen birds to all birds
    }

    const randomBird = unseenBirds[Math.floor(Math.random() * unseenBirds.length)];

    setCurrentBird(randomBird);
    setSeenBirds(prevSeenBirds => [...prevSeenBirds, randomBird.id]);
  };

  return (
    <Layout>
      <Header
        title="Birdy"
        subtitle="Entraînez-vous à reconnaître les oiseaux"
      />

      <ModeToggle isSoundMode={isSoundMode} onToggle={toggleMode} />

      <FlashCard
        bird={currentBird}
        isSoundMode={isSoundMode}
        onNext={getNextBird}
      />
    </Layout>
  );
};

export default IndexPage;
