# nest-project

## prerequests 
- npm i to install all dependecies
- Ensure Docker is already installed .
-  In the terminal, execute the command: `npm run db:dev:up` to create a PostgreSQL image.
- NB : feel free to modify the credentials to connect to the database in `docker-compose.yml`
- in order to visualize your data  run the command `npx prisma studio`  and you will receive a link. Paste it into your browser.
- To generate the `.env` file, run the command `npm run generate-env-file`. This command will execute a Bash script that retrieves information from the `docker-compose.yml` file and then places it into the `.env` file.
