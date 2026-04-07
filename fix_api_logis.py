import os
import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = re.sub(r"import\.meta\.env\.VITE_API_URL\s*\|\|\s*['\"]([^'\"]+)['\"]", r"import.meta.env.VITE_API_URL ?? '\1'", content)

    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Fixed {filepath}")

for root, _, files in os.walk('frontend/src'):
    for file in files:
        if file.endswith('.ts') or file.endswith('.tsx'):
            fix_file(os.path.join(root, file))
