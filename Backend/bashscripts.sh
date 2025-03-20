!/bin/bash

function rename_files() {
  for file in *; do
    if [[ -d "$file" ]]; then
      cd "$file"
      rename_files
      cd ..
    elif [[ "$file" =~ \.mjs.ts$ ]]; then
      mv "$file" "${file%.mjs.ts}.ts"
    fi
  done
}

rename_files
