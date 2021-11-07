# {{cookiecutter.project_name}}

{{cookiecutter.project_description}}

## Getting started

- Install root project deps

```bash
npm i
```

- Bootstrap client and server

```bash
npm run bootstrap
```

- Run client and server with hot-reload

```bash
export PORT=8080 && npm start
```

### Running the server in Docker

```bash
cd server
docker build -t <IMAGE_NAME> --build-arg PORT=8080 .
...
docker run -p 8080:8080 <IMAGE_NAME>
```
