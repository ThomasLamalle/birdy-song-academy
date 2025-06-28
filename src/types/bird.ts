
export interface Bird {
  id: string;
  name: string;
  scientificName: string;
  image_path: string;
  sound_path: string;
  soundMetadata: {
    recordingProvider: string;
    country: string;
    latitude: number;
    longitude: number;
    type: string;
  };
  description: string;
  size: string;
  habitat: string[];
  characteristics: {
    color: string[];
    beak: string;
    size: string;
  };
  level: number; // Mastery level for the user
  correctGuesses: number;
  totalGuesses: number;
  experience: number; // New experience points
  experienceToNextLevel: number; // Experience needed for next level
}
