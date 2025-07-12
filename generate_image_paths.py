import os
import json

def generate_image_paths(base_path, output_file):
    image_data = {}
    bird_images_path = os.path.join(base_path, 'public', 'bird_images_cnames')

    for bird_folder in os.listdir(bird_images_path):
        bird_folder_path = os.path.join(bird_images_path, bird_folder)
        if os.path.isdir(bird_folder_path):
            images = []
            for image_file in os.listdir(bird_folder_path):
                if image_file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                    # Store path relative to public folder
                    images.append(f'/bird_images_cnames/{bird_folder}/{image_file}')
            if images:
                image_data[bird_folder.replace(' bird', '')] = images

    with open(output_file, 'w') as f:
        json.dump(image_data, f, indent=4)

if __name__ == "__main__":
    # Assuming the script is run from the project root
    project_root = os.getcwd()
    output_json_file = os.path.join(project_root, 'src', 'data', 'bird_image_paths.json')
    
    # Create the src/data directory if it doesn't exist
    os.makedirs(os.path.dirname(output_json_file), exist_ok=True)
    
    generate_image_paths(project_root, output_json_file)
    print(f"Generated {output_json_file}")
