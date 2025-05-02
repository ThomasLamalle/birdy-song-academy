import json

json_file_path = "birdsong_metadata.json"  # Path to the output JSON file
with open(json_file_path, mode="r", encoding="utf-8") as json_file:
    old_json = json.load(json_file)
    new_data = {}
    for key, value in old_json.items():
        eng_cname = value["english_cname"]
        if eng_cname not in new_data.keys():
            new_data[eng_cname] = {
                "genus": value["genus"],
                "species": value["species"],
                "french_cname": value["french_cname"],
                "english_cname": value["english_cname"],
                "sounds": [
                    {
                        "who_provided_recording": value["who_provided_recording"],
                        "country": value["country"],
                        "latitude": value["latitude"],
                        "longitute": value["longitute"],
                        "type": value["type"],
                        "license": value["license"],
                        "file_id": value["file_id"],
                    }
                ],
            }
        else:
            new_data[eng_cname]["sounds"].append(
                {
                    "who_provided_recording": value["who_provided_recording"],
                    "country": value["country"],
                    "latitude": value["latitude"],
                    "longitute": value["longitute"],
                    "type": value["type"],
                    "license": value["license"],
                    "file_id": value["file_id"],
                }
            )
dataset_path = "dataset.json"  # Path to the output JSON file
with open(dataset_path, mode="w", encoding="utf-8") as dataset_file:
    json.dump(new_data, dataset_file, indent=4)
