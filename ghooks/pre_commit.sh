#!/usr/bin/env bash

set -e

add_copyright_header () {
    local copyright="// © 2021 - FOREVER, ALL RIGHTS RESERVED"
    local line2="// Ed Estes, Daniel Newman, William J. Steele"
    local header=${copyright/FOREVER/$(date +%Y)}
    local regex="^\/\/ © 2021 - ([0-9]{4}), ALL RIGHTS RESERVED$"

    if [[ $(head -n 1 $1) =~ $regex ]]; then
        if [[ ${BASH_REMATCH[1]} != $(date +%Y) ]]; then
            echo "$(tail -n +2 $1)" > $1
            printf "%s\n%s" "$header" "$(cat $1)" > $1
            echo "Updated the copyright header for $1"
        fi
    else
        printf "%s\n%s\n\n%s" "$header" "$line2" "$(cat $1)" > $1
        echo "Added the copyright header to $1"
    fi
}

main () {
    git_cached_files=$(git diff --cached --name-only --diff-filter=ACMR | grep "\.js$" | grep -v "ghooks/" || true)
    for file in $git_cached_files; do
        add_copyright_header $file
    done

    local file_array=($git_cached_files)
    local file_count=${#file_array[@]}
    if [[ ! $file_count -eq 0 ]]; then
        echo "Linting $file_count files"
        ./node_modules/.bin/eslint --fix $git_cached_files
        git add $git_cached_files
        for file in $git_cached_files; do echo "Linted and fixed $file"; done
    fi

    if [[ " ${file_array[@]} " =~ " lib/printerState.js " ]]; then
      ./ghooks/build_enums > lib/validators/defs.json.tmp
      mv lib/validators/defs.json.tmp lib/validators/defs.json
      git add lib/validators/defs.json
      echo "Rebuilt lib/validators/defs.json"
    fi

    echo "Staged files are linted and fixed. Ready to commit."
}

main "$@"
