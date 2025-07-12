
import { SongMetadata } from "../types";
import birdImagePaths from "../data/bird_image_paths.json";

interface SongMetadata {
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

// This function will generate a path to the song file based on the XC file ID
export const getSongPath = (fileId: string): string => {
  if (!fileId) {
    console.error("getSongPath: No fileId provided, returning placeholder");
    return "/sounds/placeholder.mp3";
  }
  const path = `/songs_mp3/xc${fileId}.mp3`;
  return path;
};

// This function will match bird scientific names with song metadata
export const matchBirdWithSong = (scientificName: string, metadataItems: SongMetadata[]): SongMetadata | undefined => {
  // The scientific name format is typically "Genus species"
  const [genus, species] = scientificName.split(" ");

  return metadataItems.find(item =>
    item.genus.toLowerCase() === genus.toLowerCase() &&
    item.species.toLowerCase() === species.toLowerCase()
  );
};

// Function to get multiple songs for a bird if available
export const getAllSongsForBird = (scientificName: string, metadataItems: SongMetadata[]): SongMetadata[] => {
  const [genus, species] = scientificName.split(" ");

  return metadataItems.filter(item =>
    item.genus.toLowerCase() === genus.toLowerCase() &&
    item.species.toLowerCase() === species.toLowerCase()
  );
};

// Function to get image path for a bird
export const getBirdImagePath = (birdCommonName: string): string => {
  const images = (birdImagePaths as Record<string, string[]>)[birdCommonName];
  if (images && images.length > 0) {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }
  console.warn(`No images found for bird: ${birdCommonName}, returning placeholder.`);
  return "/birds/placeholder.jpg"; // Fallback placeholder image
};
