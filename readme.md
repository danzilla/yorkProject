# York Assesment
- **Engine**		 : Node.js v8+
- **Database**	 	 : PostgreSQL
- **Server**	 	 : Node.js - Express
- **Client**	 	 : Node.js - React
- **API-Endpoint**	 : REST API

# Requirement
- PostgreSQL (Containerized)
	- <s>Download and Install PostgreSQL</s>
- NPM and nodeJs (Local Dev Mode)
	- <s>Download and Install nodeJs v8+</s>
- Docker and Docker-compose (***Required***)
	- Download and Install Docker and Docker-compose
	- https://docs.docker.com/install/
	- https://docs.docker.com/compose/install/
- Database and pgAdmin are Containerized

# Services
| Services                | Port |
|-------------------------|------|
| Client - Frontend       | 3000 |
| Server - Backend        | 5000 |
| Database		          | 5432 |
| PGAdmin - DB Management | 5050 |

## Deploy using **NPM** (*require* - npm and nodejs)
- Change directory to blingBlaw
	- > `cd ./York_Project`
- Launch the app
	- > Clean-docker 
		- > `docker-compose rm -f && docker-compose build --no-cache`
	- > Install-Packages 
		- > `npm install`
	- > Client-deploy 
		- > `npm run client`
	- > Server-deploy 
		- > `npm run server`
	- > Database-deploy 
		- > `npm run db`