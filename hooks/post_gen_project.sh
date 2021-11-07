#!/bin/bash

git init

npm i

if [[ "{{cookiecutter.create_react_app}}" == "true" ]]; then
  cd client
  rm .gitkeep
  npx create-react-app .
  rm -rf .git/ # remove cra's git folder
  rm .gitignore
  rm README.md
  cd ..
fi

cd server && npm i
