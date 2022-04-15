# {{cookiecutter.project_name}}

{{cookiecutter.project_description}}

## Getting started

- Create .env file from example file

```bash
cp server/.env-example server/.env
```

- Run server locally

```bash
cd server
npm i
npm start
```

### Running the server in Docker

```bash
cd server
docker build -t <IMAGE_NAME> --build-arg PORT=8080 .
...
docker run -p 8080:8080 <IMAGE_NAME>
```
