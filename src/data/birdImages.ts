
// Bird images dataset
// Each entry contains name and image path for each bird species

interface BirdImage {
  name: string;
  scientificName: string;
  imagePath: string;
  attribution: string;
}

export const birdImages: BirdImage[] = [
  {
    name: "Merle noir",
    scientificName: "Turdus merula",
    imagePath: "/birds/blackbird.jpg",
    attribution: "Public domain"
  },
  {
    name: "Mésange charbonnière",
    scientificName: "Parus major",
    imagePath: "/birds/great_tit.jpg",
    attribution: "Public domain"
  },
  {
    name: "Rouge-gorge",
    scientificName: "Erithacus rubecula",
    imagePath: "/birds/robin.jpg",
    attribution: "Public domain" 
  },
  {
    name: "Moineau domestique",
    scientificName: "Passer domesticus",
    imagePath: "/birds/house_sparrow.jpg",
    attribution: "Public domain"
  },
  {
    name: "Pic épeiche",
    scientificName: "Dendrocopos major",
    imagePath: "/birds/great_spotted_woodpecker.jpg",
    attribution: "Public domain"
  },
  {
    name: "Chouette hulotte",
    scientificName: "Strix aluco",
    imagePath: "/birds/tawny_owl.jpg",
    attribution: "Public domain"
  }
];

// Helper function to get image path by bird name
export const getBirdImageByName = (name: string): string => {
  const bird = birdImages.find(bird => bird.name === name);
  return bird ? bird.imagePath : "/birds/placeholder.jpg";
};

// Helper function to get image path by scientific name
export const getBirdImageByScientificName = (scientificName: string): string => {
  const bird = birdImages.find(bird => bird.scientificName === scientificName);
  return bird ? bird.imagePath : "/birds/placeholder.jpg";
};
