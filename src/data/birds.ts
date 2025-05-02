import { Bird } from "../types/bird";
import { getBirdImagePath, getSongPath } from "../utils/songUtils";

// Load bird song metadata from the JSON file (browser-compatible)
import birdSongMetadata from '../../birdsong_metadata.json';

// Replace the hardcoded birds array with dynamic loading from the JSON file
export const birds: Bird[] = Object.values(birdSongMetadata).map((metadata: any) => ({
  id: metadata.file_id,
  name: metadata.french_cname,
  scientificName: `${metadata.genus} ${metadata.species}`,
  image_path: getBirdImagePath(metadata.english_cname),
  sound_path: getSongPath(metadata.file_id),
  soundMetadata: {
    recordingProvider: metadata.recordingProvider,
    country: metadata.country,
    latitude: metadata.latitude,
    longitude: metadata.longitude,
    type: metadata.type,
  },
  description: "No description for now",
  size: "Not available",
  level: metadata.level || 0,
  correctGuesses: metadata.correctGuesses || 0,
  totalGuesses: metadata.totalGuesses || 0,
  habitat: metadata.habitat || "Unknown habitat",
  characteristics: metadata.characteristics || "No characteristics available"
}));

// Placeholder image and sound
export const placeholderBirdImage = "/birds/placeholder.jpg";
export const placeholderBirdSound = "/sounds/placeholder.mp3";

// Get random birds for quiz
export const getRandomBirds = (count: number) => {
  const shuffled = [...birds].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Get random birds for quiz with one correct answer
export const getQuizBirds = (correctBird: Bird, optionsCount: number) => {
  const otherBirds = birds.filter(bird => bird.id !== correctBird.id);
  console.log('Filtered otherBirds:', otherBirds); // Debugging log
  if (otherBirds.length === 0) {
    console.warn('No other birds available for quiz options.');
  }
  console.log('Correct bird ID:', correctBird.id);
  console.log('All bird IDs:', birds.map(bird => bird.id));
  console.log('All birds:', birds);
  console.log('Correct bird:', correctBird);
  const shuffled = [...otherBirds].sort(() => 0.5 - Math.random());
  const options = shuffled.slice(0, Math.max(0, optionsCount - 1)); // Ensure at least one option
  options.push(correctBird);
  return options.sort(() => 0.5 - Math.random());
};
