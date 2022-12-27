# Dockerized simple todos app

## Project setup

The project consist in 4 docker images

- app: project's front-end
- api: project's back-end
- db: Postgres database to persist data
- server: nginx server

### Deployment

1. clone the repo this repo on production server.
2. set ``.env`` ``.env.api `` ``.env.db`` ``.env.server`` on the root of the project.
3. set ssl certificates ``/certs/<domain>.key`` and ``/certs/<domain>.pem`` on the root of the project.
4. run ``cd todos && docker compose up -d --build``.
5. run ``docker compose run api php artisan migrate`` to run database migrations.

## Notes
after deployment you will get an error ``401 unauthorized.`` when visiting the app. that's because there's no users on the database.

you will need to create 1 user using the ``create user endpoint``, then set the returned token inside ``.env`` and rebuild with ``docker compose run app npm run build``, as this project doesn't not have UI to create users.

## Structure
this project was build in Vue.js and is intended to:

- practice how to deploy a 100% dockerized app.
- how to build a JSONAPI backend build up with proper security.
- connect it to a UI.

it lacks of login page, and user CRUD.

here's is how UI code is structured.
```.
├── certs (ssl certificated, not pushed)
├── public
│   ├── 
│   ├── 
│   └── 
├── src (vue code)
│   ├── 
│   ├── 
│   └── 
├── templates (nginx configuration templates)
│...
│...
```
for back-end readme, visit: [Todos API](https://github.com/juliorafaelr/api-todos "Todos API").

for NGINX documentation, visit: [Nginx docker](https://hub.docker.com/_/nginx "Nginx docker").

For POSTGRES documentation, visit: [Postgres docker](https://hub.docker.com/_/postgres "Postgres docker").

