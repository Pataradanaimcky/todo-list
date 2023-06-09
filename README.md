# Todo App

A simple Todo application built with React and Node.js.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Authentication](#authentication)

## Introduction

The Todo App is a web application that allows users to manage their tasks and keep track of their todo list. It provides basic functionalities such as creating new todos, editing existing todos, marking todos as completed, and deleting todos. In addition, it offers user authentication to secure the application and provide personalized todo lists for each user.

The frontend of the application is built with React, while the backend is built with Node.js and MongoDB is used as the database to store the todo data and user information.

## Features

- Create new todos with a title, description, priority, and date.
- Edit existing todos to update their details.
- Mark todos as completed to track progress.
- Delete todos to remove them from the list.
- User authentication with signup and login functionality.
- Personalized todo lists for each authenticated user.
- Responsive design that works well on different screen sizes.

## Installation

To run the Todo App locally, follow these steps:

1. Clone the repository:
```
git clone https://github.com/your-username/todo-app.git
```

2. Navigate to the project directory:
```
cd todo-app
```

3. Install the dependencies for the frontend:
```
cd client
npm install
```

4. Install the dependencies for the backend:
```
cd ../server
npm install
```

5. Create a MongoDB database and obtain the connection URI.

6. Create a `.env` file in the `server` directory and add the following environment variables:
```
PORT=4000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

7. Start the development server for the frontend:
```
cd ../client
npm start
```

8. Start the development server for the backend:
```
cd ../server
npm start
```

## Authentication

The Todo App uses user authentication to provide a personalized experience for each user. Users can sign up for a new account or log in with their existing credentials. The authentication functionality is implemented using JSON Web Tokens (JWT).

- Sign Up: Users can sign up for a new account by providing a unique username and a password. The password is securely hashed before storing it in the database.
- Login: Users can log in to their account using their username and password. Upon successful login, a JSON Web Token is generated and sent to the client. The client includes this token in subsequent requests to access protected routes.
- Protected Routes: Certain routes in the application require authentication. These routes are protected and can only be accessed with a valid JSON Web Token. If a user attempts to access a protected route without authentication, they will be redirected to the login page.

Please note that the authentication functionality is not fully implemented in this version of the Todo App. Additional work is required to handle user registration, authentication, and authorization.
