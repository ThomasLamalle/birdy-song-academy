import csv
import os

from bing_image_downloader import downloader

# Chemin vers le fichier CSV
csv_file_path = (
    r"c:\Users\lamal\Documents\Projects\Birdy\birdy-song-academy\birdsong_metadata.csv"
)

# Dossier où les images seront téléchargées
output_folder = (
    r"c:\Users\lamal\Documents\Projects\Birdy\birdy-song-academy\bird_images"
)

# Crée le dossier de sortie s'il n'existe pas
os.makedirs(output_folder, exist_ok=True)

# Lecture du fichier CSV et téléchargement des images
with open(csv_file_path, mode="r", encoding="utf-8") as csv_file:
    reader = csv.DictReader(csv_file)
    for row in reader:
        id_ = row["file_id"]
        bird_name = f"{row['genus']} {row['species']}".lower()
        search_query = f"{bird_name} bird"
        bird_output_folder = os.path.join(output_folder, id_)

        # Télécharge les images pour chaque oiseau
        try:
            downloader.download(
                search_query,
                limit=5,
                output_dir=output_folder,
                adult_filter_off=True,
                force_replace=False,
                timeout=60,
            )
            print(".", sep=None)
        except Exception as e:
            print("x", sep=None)
