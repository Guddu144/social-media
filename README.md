# SOcial Media

This is a Social Media platform that allows users to create, share, and interact with events. Follow the instructions below to set up and run the project.

# Prerequisites

1. Node.js
2. MySQL

# Setup

. Clone the Repository
Clone the repository to your local machine using the following command:

    git clone git@github.com:Guddu144/social-media.git
    cd social-media

. Create a .env File
Create a .env file at the root of the project. The structure should be based on the .env.example file provided in the repository. For example:

    DATABASE_URL="mysql://root:guddu123@localhost:3306/social-media"
    JWT_SECRET="your_jwt_secret"
    PORT=3000

. Install Dependencies
Install the project dependencies using npm:

    npm install

. Start the Project

    npm run start:dev

. Run Database Migration
To run database migrations, use the following commands

    npx prisma generate
    npx prisma migrate dev --name init

. Access the Application
Open your browser and go to http://localhost:PORT (replace PORT with the actual port number).
Swagger API documentation can be accessed at:

http://localhost:PORT/api-docs

# Project Structure

    src/: Contains the main source code for the application.
    controllers/: Contains the route controllers.
    middleware/: Contains middleware functions.
    models/: Contains Prisma models and schema definitions.
    routes/: Contains the route definitions.
    services/: Contains service functions.
    utils/: Contains utility functions.
    prisma/: Contains Prisma schema and seed files.
