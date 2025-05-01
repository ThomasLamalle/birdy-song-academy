import csv
import os

# Paths to the CSV file and bird_images directory
csv_file_path = "birdsong_metadata.csv"
bird_images_folder = "bird_images"

# Load the mapping of genus and species to IDs from the CSV file
id_mapping = {}
with open(csv_file_path, mode="r", encoding="utf-8") as csv_file:
    reader = csv.DictReader(csv_file)
    for row in reader:
        genus_species = f"{row['genus']} {row['species']}".lower()
        id_mapping[genus_species] = row["file_id"]

# Walk through the bird_images directory and rename folders
for folder_name in os.listdir(bird_images_folder):
    folder_path = os.path.join(bird_images_folder, folder_name)
    if os.path.isdir(folder_path):
        genus_species = folder_name.replace(" bird", "").lower()
        if genus_species in id_mapping:
            new_folder_name = id_mapping[genus_species]
            new_folder_path = os.path.join(bird_images_folder, new_folder_name)
            os.rename(folder_path, new_folder_path)
            print(f"Renamed: {folder_name} -> {new_folder_name}")
        else:
            print(f"No ID found for: {folder_name}")
