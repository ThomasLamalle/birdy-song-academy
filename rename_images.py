import os
from pathlib import Path

bird_images_folder = Path(
    r"C:\Users\lamal\Documents\Projects\Birdy\birdy-song-academy\bird_images"
)
# Walk through the bird_images directory and rename folders
for folder_name in bird_images_folder.glob("*"):
    for image_path in folder_name.glob("*.jpg"):
        print(image_path)
        _, ind = image_path.name.split("_")
        image_path.rename(folder_name / f"{folder_name.name}_{ind}")
