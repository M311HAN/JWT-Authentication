# JWT Authentication and Authorization Express App

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Launching the App](#launching-the-app)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Testing](#testing)
- [Components](#components)
- [Creator](#creator)

## Description

This project is a simple Express.js application that demonstrates **JWT-based authentication and role-based authorization**. It allows users to log in, receive a JWT, and access different routes based on their assigned permissions. The app secures admin-only routes and ensures that only users with valid tokens can access protected routes.

You can visit `Screenshots-Examples` Directory to see the API Endpoints in action.

## Features

- **JWT Authentication**: Users can log in and receive a token to access protected resources.
- **Role-Based Authorization**: Admin users have access to additional routes, while regular users have limited access.
- **Middleware**: Clean and reusable middleware for checking authentication and role permissions.
- **Environment Variables**: Secret keys and other sensitive information are stored securely using environment variables.

## Technologies Used

- **Node.js**
- **Express.js**
- **JWT (jsonwebtoken)**
- **dotenv**
- **Postman** (for testing API endpoints)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 14 or later)
- **npm** (version 6 or later)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-repo/jwt-authentication.git
```

2. Navigate to the project directory:

```bash
cd jwt-authentication
```

3. Install the project dependencies:

```bash
npm install
```

4. Create a .env file in the root directory and add the following:

```bash
SECRET_KEY=your-secret-key
```

## Launching the App

1. Start the app in development mode with nodemon:

```bash
npm run dev
```

2. Or start it in production mode:

```bash
npm start
```

The app will be running at: `http://localhost:8000`.

## API Endpoints

- **POST** `/login`
  Authenticate the user and receive a JWT.

Example body:

```bash
{
  "username": "Admin",
  "password": "adminpass"
}
```

- **GET** `/resource`
  Access a route that all authenticated users can access. Displays a message with the username.

- **GET** `/admin_resource`
  Admin-only route. Verifies if the user has an admin role.

- **GET** `/a`
  Route accessible by users with permission to access `/a`.

- **GET** `/b`
  Route accessible by users with permission to access `/b`.

- **GET** `/c`
  Route accessible by users with permission to access `/c`.

## Usage

- **Login**: Use the /login endpoint to authenticate users by sending a POST request with their credentials.

- **Access protected routes**: Once logged in, include the JWT in the Authorization header (`Bearer <token>`) to access protected routes.

Example:

```bash
Authorization: Bearer <your-jwt-token>
```

## Testing

To test the application, you can use Postman or any other API testing tool. Below are the testing steps:

1. **Login** with a user to get a token by sending a `POST` request to `/login`.

2. **Access the routes** `/resource`, `/admin_resource`, `/a`, `/b`, or `/c` by providing the token in the `Authorization` header.

### Example Postman Tests:

- **Login** request:

```bash
{
  "username": "Mazvita",
  "password": "password1"
}
```

- **Accessing the** `/resource` **route** with the token:
- Set the `Authorization` header as: `Bearer <token>`.

## Components

1. **JWT Authentication**: Generates and verifies JSON Web Tokens for users.

2. **Role-Based Access Control**: Admin users are granted additional access to restricted routes.

3. **Middleware**:

- `authorize`: Checks if the user has permission to access specific routes.
- `adminCheck`: Ensures only users with the `admin` role can access admin-only routes.
- `verifyToken`: Utility function to handle token verification.

## Creator

This project is created by Melihhan (https://github.com/M311HAN). Visit the repository for more projects and further collaboration.

Feel free to reach out via GitHub or email if you have any questions or feedback about this project.
