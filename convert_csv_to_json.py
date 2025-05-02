import csv
import json


def convert_csv_to_json(csv_file_path, json_file_path):
    data = {}

    # Read the CSV file with proper encoding to handle special characters
    with open(csv_file_path, mode="r", encoding="iso-8859-1") as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            file_id = row["file_id"]  # Use the 'file_id' column as the key
            data[file_id] = row

    # Write to a JSON file
    with open(json_file_path, mode="w", encoding="utf-8") as json_file:
        json.dump(data, json_file, indent=4)


if __name__ == "__main__":
    csv_file_path = "birdsong_metadata.csv"  # Path to the input CSV file
    json_file_path = "birdsong_metadata.json"  # Path to the output JSON file
    convert_csv_to_json(csv_file_path, json_file_path)
    print(f"Converted {csv_file_path} to {json_file_path}")
