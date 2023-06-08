# Todo App

A simple Todo application built with React and Node.js.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)

## Introduction

The Todo App is a web application that allows users to manage their tasks and keep track of their todo list. It provides basic functionalities such as creating new todos, editing existing todos, marking todos as completed, and deleting todos.

The frontend of the application is built with React, while the backend is built with Node.js and MongoDB is used as the database to store the todo data.

## Features

- Create new todos with a title, description, priority, and date.
- Edit existing todos to update their details.
- Mark todos as completed to track progress.
- Delete todos to remove them from the list.
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
<span style="color:red;">**Note: The front end needs to be fixed, and the backend still requires login and signup functionality.**</span>