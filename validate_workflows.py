import os
import yaml
import sys

def validate_yaml(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            yaml.safe_load(f)
        return True, None
    except Exception as e:
        return False, str(e)

def main():
    root_dir = r"c:\Users\nelso\OneDrive\Desktop\git"
    invalid_files = []
    
    for root, dirs, files in os.walk(root_dir):
        if ".github" in root and "workflows" in root:
            for file in files:
                if file.endswith(".yml") or file.endswith(".yaml"):
                    file_path = os.path.join(root, file)
                    is_valid, error = validate_yaml(file_path)
                    if not is_valid:
                        invalid_files.append((file_path, error))
                        print(f"INVALID: {file_path}")
                        print(f"  Error: {error}")
                    else:
                        print(f"VALID: {file_path}")

    if not invalid_files:
        print("\nAll workflow YAML files are valid!")
    else:
        print(f"\nFound {len(invalid_files)} invalid YAML files.")

if __name__ == "__main__":
    main()
