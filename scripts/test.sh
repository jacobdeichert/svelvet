#!/usr/bin/env bash
set -e # Exit on error

repo_root=$(pwd)

# Install and build each snapshot
cd tests
for snapshot_dir in $(find . -type d -mindepth 1 -maxdepth 1); do
    cd $snapshot_dir
    echo "========================================================="
    echo "TESTING $snapshot_dir"
    echo "========================================================="
    npm install
    npm run build
    cd ..
done


# Format dist so it's more readable
cd $repo_root
npm run format

# Exit with an error if there's any changes in the tests/*/public/dist directories
test_err_msg="\n\nTEST ERROR: dist contains changed files that do not match the snapshot\n\n"
git add -A
git diff-index --quiet HEAD -- tests || (printf "$test_err_msg" && git status && exit 1);
