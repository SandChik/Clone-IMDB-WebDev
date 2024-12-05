# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:7000](http://localhost:7000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

<img src="" />



``` bash
psql -U postgres
\l
DROP DATABASE movie_db;
SELECT pid, datname, usename, application_name, client_addr, backend_start 
FROM pg_stat_activity
WHERE datname = 'movie_db';
SELECT pg_terminate_backend(<pid>);
```

Konfigurasi database
``` bash
docker cp database_dump.sql db:/tmp/movie-simple-backup.sql
docker exec -it db sh
CREATE DATABASE movie_db;
psql -U postgres
\c movie_db
\i /tmp/movie-simple-backup.sql
\dt
\d "Users"
SELECT * FROM "Users" LIMIT;
INSERT INTO "Users" (username, email, role, password) VALUES ('admin', 'admin@gmail.com', 'ADMIN', 'admin_password');
```