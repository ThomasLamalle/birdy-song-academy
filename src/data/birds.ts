
import { Bird } from "../types/bird";
import { getSongPath } from "../utils/songUtils";

// Import bird song metadata - in a real app, you'd load this from a JSON file or API
// For now, we're using a simplified version with just a few entries
const birdSongMetadata = [
  {
    file_id: "101371",
    genus: "Turdus",
    species: "merula",
    english_cname: "Common Blackbird",
    who_provided_recording: "Jarek Matusiak",
    country: "Poland",
    latitude: 52.235,
    longitude: 21.0724,
    type: "song"
  },
  {
    file_id: "133862",
    genus: "Parus",
    species: "major",
    english_cname: "Great Tit",
    who_provided_recording: "Jarek Matusiak",
    country: "Poland",
    latitude: 52.235,
    longitude: 21.0724,
    type: "song"
  },
  {
    file_id: "110167",
    genus: "Erithacus",
    species: "rubecula",
    english_cname: "European Robin",
    who_provided_recording: "Jarek Matusiak",
    country: "Poland",
    latitude: 52.235,
    longitude: 21.0724,
    type: "song"
  },
  {
    file_id: "128851",
    genus: "Passer",
    species: "domesticus",
    english_cname: "House Sparrow",
    who_provided_recording: "Jarek Matusiak",
    country: "Poland",
    latitude: 52.235,
    longitude: 21.0724,
    type: "song"
  },
  {
    file_id: "102932",
    genus: "Dendrocopos",
    species: "major",
    english_cname: "Great Spotted Woodpecker",
    who_provided_recording: "Jarek Matusiak",
    country: "Poland",
    latitude: 52.235,
    longitude: 21.0724,
    type: "drumming"
  },
  {
    file_id: "35068",
    genus: "Strix",
    species: "aluco",
    english_cname: "Tawny Owl",
    who_provided_recording: "Jarek Matusiak",
    country: "Poland",
    latitude: 52.235,
    longitude: 21.0724,
    type: "song"
  }
];

// Sample birds data with updated sound paths and experience system
export const birds: Bird[] = [
  {
    id: "1",
    name: "Merle noir",
    scientificName: "Turdus merula",
    image: "/birds/blackbird.jpg",
    sound: getSongPath("101371"),
    soundFileId: "101371",
    soundMetadata: {
      genus: "Turdus",
      species: "merula",
      englishName: "Common Blackbird",
      recordingProvider: "Jarek Matusiak",
      country: "Poland",
      latitude: 52.235,
      longitude: 21.0724,
      type: "song"
    },
    description: "Oiseau commun au plumage noir et au bec orange chez le mâle.",
    size: "24-25 cm",
    habitat: ["Jardins", "Forêts", "Parcs urbains"],
    characteristics: {
      color: ["Noir", "Jaune-orange (bec)"],
      beak: "Fin et pointu",
      size: "medium",
    },
    level: 0,
    correctGuesses: 0,
    totalGuesses: 0,
    experience: 0,
    experienceToNextLevel: 100
  },
  {
    id: "2",
    name: "Mésange charbonnière",
    scientificName: "Parus major",
    image: "/birds/great_tit.jpg",
    sound: getSongPath("133862"),
    soundFileId: "133862",
    soundMetadata: {
      genus: "Parus",
      species: "major",
      englishName: "Great Tit",
      recordingProvider: "Jarek Matusiak",
      country: "Poland",
      latitude: 52.235,
      longitude: 21.0724,
      type: "song"
    },
    description: "Petite mésange colorée avec tête noire et joues blanches.",
    size: "13-14 cm",
    habitat: ["Jardins", "Forêts de feuillus", "Parcs"],
    characteristics: {
      color: ["Jaune", "Noir", "Blanc", "Bleu-gris"],
      beak: "Court et conique",
      size: "small",
    },
    level: 0,
    correctGuesses: 0,
    totalGuesses: 0,
    experience: 0,
    experienceToNextLevel: 100
  },
  {
    id: "3",
    name: "Rouge-gorge",
    scientificName: "Erithacus rubecula",
    image: "/birds/robin.jpg",
    sound: getSongPath("110167"),
    soundFileId: "110167",
    soundMetadata: {
      genus: "Erithacus",
      species: "rubecula",
      englishName: "European Robin",
      recordingProvider: "Jarek Matusiak",
      country: "Poland",
      latitude: 52.235,
      longitude: 21.0724,
      type: "song"
    },
    description: "Petit oiseau familier avec poitrine rouge-orangée distinctive.",
    size: "12-14 cm",
    habitat: ["Jardins", "Forêts", "Haies"],
    characteristics: {
      color: ["Brun", "Orange-rouge", "Gris"],
      beak: "Fin",
      size: "small",
    },
    level: 0,
    correctGuesses: 0,
    totalGuesses: 0,
    experience: 0,
    experienceToNextLevel: 100
  },
  {
    id: "4",
    name: "Moineau domestique",
    scientificName: "Passer domesticus",
    image: "/birds/house_sparrow.jpg",
    sound: getSongPath("128851"),
    soundFileId: "128851",
    soundMetadata: {
      genus: "Passer",
      species: "domesticus",
      englishName: "House Sparrow",
      recordingProvider: "Jarek Matusiak",
      country: "Poland",
      latitude: 52.235,
      longitude: 21.0724,
      type: "song"
    },
    description: "Petit oiseau brun très répandu dans les zones habitées.",
    size: "14-16 cm",
    habitat: ["Villes", "Villages", "Fermes"],
    characteristics: {
      color: ["Brun", "Gris", "Noir"],
      beak: "Court et conique",
      size: "small",
    },
    level: 0,
    correctGuesses: 0,
    totalGuesses: 0,
    experience: 0,
    experienceToNextLevel: 100
  },
  {
    id: "5",
    name: "Pic épeiche",
    scientificName: "Dendrocopos major",
    image: "/birds/great_spotted_woodpecker.jpg",
    sound: getSongPath("102932"),
    soundFileId: "102932",
    soundMetadata: {
      genus: "Dendrocopos",
      species: "major",
      englishName: "Great Spotted Woodpecker",
      recordingProvider: "Jarek Matusiak",
      country: "Poland",
      latitude: 52.235,
      longitude: 21.0724,
      type: "drumming"
    },
    description: "Pic noir et blanc avec du rouge sous la queue.",
    size: "20-24 cm",
    habitat: ["Forêts", "Parcs", "Jardins arborés"],
    characteristics: {
      color: ["Noir", "Blanc", "Rouge"],
      beak: "Droit et puissant",
      size: "medium",
    },
    level: 0,
    correctGuesses: 0,
    totalGuesses: 0,
    experience: 0,
    experienceToNextLevel: 100
  },
  {
    id: "6",
    name: "Chouette hulotte",
    scientificName: "Strix aluco",
    image: "/birds/tawny_owl.jpg",
    sound: getSongPath("35068"),
    soundFileId: "35068",
    soundMetadata: {
      genus: "Strix",
      species: "aluco",
      englishName: "Tawny Owl",
      recordingProvider: "Jarek Matusiak",
      country: "Poland",
      latitude: 52.235,
      longitude: 21.0724,
      type: "song"
    },
    description: "Chouette commune au hululement caractéristique.",
    size: "37-39 cm",
    habitat: ["Forêts", "Parcs", "Zones boisées"],
    characteristics: {
      color: ["Brun", "Gris", "Tacheté"],
      beak: "Court et crochu",
      size: "large",
    },
    level: 0,
    correctGuesses: 0,
    totalGuesses: 0,
    experience: 0,
    experienceToNextLevel: 100
  }
];

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
  const shuffled = [...otherBirds].sort(() => 0.5 - Math.random());
  const options = shuffled.slice(0, optionsCount - 1);
  options.push(correctBird);
  return options.sort(() => 0.5 - Math.random());
};
