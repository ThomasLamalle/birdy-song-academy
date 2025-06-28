
export interface Bird {
  id: string;
  name: string;
  scientificName: string;
  image: string;
  sound: string;
  soundFileId?: string;  // The XC file ID for the song
  soundMetadata?: {
    genus: string;
    species: string;
    englishName: string;
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
    size: 'tiny' | 'small' | 'medium' | 'large' | 'very large';
  };
  level: number; // Mastery level for the user
  correctGuesses: number;
  totalGuesses: number;
  experience: number; // New experience points
  experienceToNextLevel: number; // Experience needed for next level
}
