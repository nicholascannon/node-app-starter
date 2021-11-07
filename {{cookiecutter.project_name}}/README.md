# {{cookiecutter.project_name}}

{{cookiecutter.project_description}}

## How to run

- Locally with hot-reload

```bash
export PORT=8080 && npm start
```

- With Docker

```bash
$ docker build -t <IMAGE_NAME> --build-arg PORT=8080 .
...
$ docker run -p 8080:8080 <IMAGE_NAME>
```
