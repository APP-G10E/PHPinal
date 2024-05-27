import json
from collections import OrderedDict

def sort_json_keys(json_file_path, output_file_path):
    # Read the JSON file
    with open(json_file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)

    # Sort the keys within each language section
    sorted_data = OrderedDict()
    for lang in sorted(data.keys()):
        sorted_data[lang] = OrderedDict(sorted(data[lang].items()))

    # Write the sorted JSON to the output file
    with open(output_file_path, 'w', encoding='utf-8') as file:
        json.dump(sorted_data, file, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    input_file = 'translations.json'
    output_file = 'translations.json'
    sort_json_keys(input_file, output_file)
    print(f"Sorted JSON saved to {output_file}")
