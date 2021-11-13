#!/bin/bash

git init

npm i

if [[ "{{cookiecutter.create_react_app}}" == "true" ]]
then
  cd client
  rm .gitkeep
  npx create-react-app --template typescript .
  rm -rf .git/ # remove cra's git folder
  rm .gitignore
  rm README.md
  echo "PORT=3000" >> .env
  cd ..
elif [[ "{{cookiecutter.create_next_app}}" == "true" ]]
then
  cd client
  rm .gitkeep
  npx create-next-app --ts .
  rm -rf .git/ # remove cna's git folder
  rm .gitignore
  rm README.md
  echo "PORT=3000" >> .env
  cd ..
fi

cd server && npm i
