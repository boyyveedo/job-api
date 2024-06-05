Project Setup

In order to spin up the project, in the root create .env with these two variables, with your own values.

MONGO_URI JWT_SECRET

After that run this command

npm install && npm start
Swagger UI

/jobs/{id}:
  parameters:
    - in: path
      name: id
      schema:
        type: string
      required: true
      description: the job id