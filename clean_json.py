import json
from pathlib import Path

# Load the JSON data
data_path = Path(
    r"C:\Users\lamal\Documents\Projects\Birdy\birdy-song-academy\birdsong_metadata.json"
)
with open(data_path, "r") as file:
    data = json.load(file)

# Check if the folder exists for each key
for key in data.keys():
    folder_path = Path(
        f"C:\\Users\\lamal\\Documents\\Projects\\Birdy\\birdy-song-academy\\bird_images\\{key}"
    )
    if not (folder_path.exists() and folder_path.is_dir()):
        print(f"Folder does NOT exist for key: {key}")
