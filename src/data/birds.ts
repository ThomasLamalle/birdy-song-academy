
import { Bird } from "../types/bird";

// Sample birds data
export const birds: Bird[] = [
  {
    id: "1",
    name: "Merle noir",
    scientificName: "Turdus merula",
    image: "/birds/blackbird.jpg",
    sound: "/sounds/blackbird.mp3",
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
    totalGuesses: 0
  },
  {
    id: "2",
    name: "Mésange charbonnière",
    scientificName: "Parus major",
    image: "/birds/great_tit.jpg",
    sound: "/sounds/great_tit.mp3",
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
    totalGuesses: 0
  },
  {
    id: "3",
    name: "Rouge-gorge",
    scientificName: "Erithacus rubecula",
    image: "/birds/robin.jpg",
    sound: "/sounds/robin.mp3",
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
    totalGuesses: 0
  },
  {
    id: "4",
    name: "Moineau domestique",
    scientificName: "Passer domesticus",
    image: "/birds/house_sparrow.jpg",
    sound: "/sounds/house_sparrow.mp3",
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
    totalGuesses: 0
  },
  {
    id: "5",
    name: "Pic épeiche",
    scientificName: "Dendrocopos major",
    image: "/birds/great_spotted_woodpecker.jpg",
    sound: "/sounds/great_spotted_woodpecker.mp3",
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
    totalGuesses: 0
  },
  {
    id: "6",
    name: "Chouette hulotte",
    scientificName: "Strix aluco",
    image: "/birds/tawny_owl.jpg",
    sound: "/sounds/tawny_owl.mp3",
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
    totalGuesses: 0
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
