import os
from pathlib import Path

from PIL import Image

folder = Path(r"C:\Users\lamal\Documents\Projects\Birdy\birdy-song-academy\bird_images")

# Iterate through all files in the folder
for file_path in folder.rglob("*.*"):
    if file_path.suffix.lower() in [".png", ".jpeg", ".jpg"]:
        new_file_path = file_path.with_suffix(".jpg")

        # Convert PNG to JPG
        if file_path.suffix.lower() == ".png":
            try:
                with Image.open(file_path) as img:
                    rgb_img = img.convert("RGB")
                    rgb_img.save(new_file_path, "JPEG")
                file_path.unlink()  # Remove the original PNG file
            except Exception as e:
                print(f"Failed to convert {file_path}: {e}")

        # Rename JPEG to JPG
        elif (
            file_path.suffix.lower() in [".jpeg", ".jpg"] and file_path != new_file_path
        ):
            try:
                file_path.rename(new_file_path)
            except Exception as e:
                print(f"Failed to rename {file_path}: {e}")
