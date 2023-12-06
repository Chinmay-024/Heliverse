# Heliverse

Heliverse is a web application that allows you to manage users and teams. Users can be added, viewed, and organized into teams. This README provides an overview of the application structure, functionality, and how to set it up.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Redux Store](#redux-store)
- [Usage](#usage)

## Features

- View a grid of users with pagination.
- Add new users with details such as first name, last name, email, gender, etc.
- Create teams by selecting users from the user grid.
- View a list of teams and their members.
- Navigate between different pages using a navigation bar.

## Technologies Used

- **React:** Frontend library for building user interfaces.
- **Redux:** State management library for managing the global state of the application.
- **React Router:** Library for handling navigation in a React application.
- **Material-UI:** React component library for building responsive and visually appealing UIs.
- **Node.js:** JavaScript runtime for server-side development.
- **Express:** Web framework for Node.js.
- **MongoDB:** NoSQL database for storing user and team data.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Chinmay-024/Heliverse.git
   ```

2. **Install dependencies:**

   ```bash
   cd heliverse-app
   npm install
   ```

3. **Set up the MongoDB database:**

   - Create a MongoDB database and update the connection string in `.env`.

4. **Run the application:**

   ```bash
   npm start
   ```

   The app will be accessible at `http://localhost:3000`.

## Folder Structure

```plaintext
heliverse-app/
|-- client/
|   |-- public/
|   |-- src/
|       |-- components/
|       |-- store/
|       |-- App.js
|       |-- index.js
|-- api/
|   |-- models/
|   |-- routes/
|   |-- config/
|   |-- index.js
|-- .gitignore
|-- package.json
|-- README.md
```

## API Endpoints

| **Endpoint**            | **Description**                              |
| ----------------------- | -------------------------------------------- |
| `GET /api/teams/count`  | Get the number of teams.                     |
| `POST /api/teams`       | Create a new team.                           |
| `GET /api/teams`        | Get a list of teams with pagination support. |
| `GET /api/teams/:id`    | Get a team by its ID.                        |
| **User Routes**         |                                              |
| `GET /api/users/count`  | Get the number of users.                     |
| `GET /api/users`        | Get a list of users with pagination support. |
| `GET /api/users/:id`    | Get a user by their ID.                      |
| `POST /api/users`       | Create a new user.                           |
| `POST /api/users/batch` | Add a batch of users.                        |
| `PUT /api/users/:id`    | Update an existing user.                     |
| `DELETE /api/users/:id` | Delete a user by ID.                         |

## Redux Store

The global state of the application is managed using Redux. Actions and reducers for both users and teams are implemented to handle state changes.

## Usage

- Navigate to the root directory and run `npm start` to start the development server.
- Open a web browser and go to `http://localhost:3000` to access the Heliverse app.
