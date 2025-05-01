
// This is a utility to load bird song metadata from a CSV file
// In a real app, you'd implement proper CSV parsing or load from a JSON API

import { Bird } from '@/types/bird';

interface SongMetadataItem {
  file_id: string;
  genus: string;
  species: string;
  english_cname: string;
  who_provided_recording: string;
  country: string;
  latitude: number;
  longitude: number;
  type: string;
}

// In a real application, this would load data from an API or parse a CSV file
// For this example, we're creating a placeholder function that would be replaced
// with actual implementation in production
export const loadSongMetadata = async (): Promise<SongMetadataItem[]> => {
  // In a real implementation, you would fetch and parse the CSV file
  // For now, returning sample metadata that matches our birds
  
  // Note: in production, you would replace this with actual CSV parsing logic
  return [
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
};

// Function to update bird objects with metadata
export const enrichBirdsWithMetadata = async (birds: Bird[]): Promise<Bird[]> => {
  const metadata = await loadSongMetadata();
  
  return birds.map(bird => {
    // Extract genus and species from scientific name
    const [genus, species] = bird.scientificName.split(' ');
    
    // Find matching metadata
    const matchingMetadata = metadata.find(item => 
      item.genus.toLowerCase() === genus.toLowerCase() && 
      item.species.toLowerCase() === species.toLowerCase()
    );
    
    if (matchingMetadata) {
      return {
        ...bird,
        sound: `/songs/xc${matchingMetadata.file_id}.flac`,
        soundFileId: matchingMetadata.file_id,
        soundMetadata: {
          genus: matchingMetadata.genus,
          species: matchingMetadata.species,
          englishName: matchingMetadata.english_cname,
          recordingProvider: matchingMetadata.who_provided_recording,
          country: matchingMetadata.country,
          latitude: matchingMetadata.latitude,
          longitude: matchingMetadata.longitude,
          type: matchingMetadata.type
        }
      };
    }
    
    return bird;
  });
};
