
export interface Bird {
  id: string;
  name: string;
  scientificName: string;
  image: string;
  sound: string;
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
}
