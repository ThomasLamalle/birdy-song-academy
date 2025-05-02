import { Bird } from "../types/bird";
import { getBirdImagePath, getSongPath } from "../utils/songUtils";

// Load bird song metadata from the JSON file (browser-compatible)
import dataset from '../../dataset.json';

// Replace the hardcoded birds array with dynamic loading from the JSON file
export const birds: Bird[] = Object.values(dataset).map((data: any) => ({
  id: data.english_cname,
  name: data.french_cname,
  scientificName: `${data.genus} ${data.species}`,
  image_path: getBirdImagePath(data.english_cname),
  sound_path: getSongPath(data.sound_info.file_id),
  soundMetadata: {
    recordingProvider: data.sound_info.recordingProvider,
    country: data.sound_info.country,
    latitude: data.sound_info.latitude,
    longitude: data.sound_info.longitude,
    type: data.sound_info.type,
  },
  description: "No description for now",
  size: "Not available",
  level: data.level || 0,
  correctGuesses: data.correctGuesses || 0,
  totalGuesses: data.totalGuesses || 0,
  habitat: data.habitat || "Unknown habitat",
  characteristics: data.characteristics || "No characteristics available"
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
