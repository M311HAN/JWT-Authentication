require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
const port = 8000;

// NOTE: The secret key is stored in an environment variable for security reasons.
// It is recommended to store sensitive information, such as the secret key, in environment variables
// to prevent exposing it in the codebase, especially in public repositories.
const SECRET_KEY = process.env.SECRET_KEY; 

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Hardcoded users with their allowed routes and roles
// Each user has a username, password, an array of routes they can access, and a role
const users = [
  {
    username: "Mazvita",
    password: "password1",
    permissions: ["/a"],
    role: "user",
  },
  {
    username: "Meagan",
    password: "password2",
    permissions: ["/a", "/b"],
    role: "user",
  },
  {
    username: "Kabelo",
    password: "password3",
    permissions: ["/b", "/c"],
    role: "user",
  },
  {
    username: "Admin",
    password: "adminpass",
    permissions: ["/a", "/b", "/c"],
    role: "admin",
  },
];

// Helper function to find a user by their username
const findUser = (username) => users.find((user) => user.username === username);

// Utility function to extract and verify the JWT token
const verifyToken = (req) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    throw new Error("Authorization header is missing!");
  }

  const token = auth.split(" ")[1];
  return jwt.verify(token, SECRET_KEY); // Return the decoded token
};

// Endpoint: /login
// This endpoint verifies the username and password from the request body and generates a JWT token
// The token payload includes the user's name, permissions (allowed routes), and role
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = findUser(username);

  // If user is found and password matches, generate a JWT with permissions and role in the payload
  if (user && user.password === password) {
    const payload = {
      name: username,
      permissions: user.permissions,
      role: user.role,
    }; // Add role to payload
    const token = jwt.sign(payload, SECRET_KEY, { algorithm: "HS256" });
    res.send({ token });
  } else {
    res.status(403).send({ err: "Incorrect login!" });
  }
});

// Middleware: authorize
// This middleware checks if the user has permission to access a specific route
const authorize = (route) => (req, res, next) => {
  try {
    const decoded = verifyToken(req); // Use the utility function to verify token
    // Check if the user has permission to access the requested route
    if (decoded.permissions.includes(route)) {
      next(); // User has permission, proceed to the next middleware or route handler
    } else {
      res.status(403).send({
        err: "Access denied: You do not have permission for this route.",
      });
    }
  } catch (err) {
    res.status(401).send({ err: err.message });
  }
};

// Middleware: adminCheck
// This middleware checks if the user has an admin role before allowing access to admin routes
const adminCheck = (req, res, next) => {
  try {
    const decoded = verifyToken(req); // Use the utility function to verify token
    // Check if the user's role is admin
    if (decoded.role === "admin") {
      next(); // User is admin, proceed to the next middleware or route handler
    } else {
      res.status(403).send({ err: "Access denied: You are not an admin." });
    }
  } catch (err) {
    res.status(401).send({ err: err.message });
  }
};

// Endpoint: /resource
// This route is accessible by all logged-in users and displays a message with the username from the JWT token
app.get("/resource", (req, res) => {
  try {
    const decoded = verifyToken(req); // Use the utility function to verify token
    res.send({ msg: `Hello, ${decoded.name}! Your JWT has been verified.` });
  } catch (err) {
    res.status(401).send({ err: err.message });
  }
});

// Endpoint: /admin_resource
// This route is only accessible by users with the admin role
app.get("/admin_resource", adminCheck, (req, res) => {
  res.send({ msg: "Success! You are an admin." });
});

// Protected routes /a, /b, and /c
// These routes are accessible based on the user's permissions stored in their JWT token
app.get("/a", authorize("/a"), (req, res) => {
  res.send({ msg: "Welcome to route /a!" });
});

app.get("/b", authorize("/b"), (req, res) => {
  res.send({ msg: "Welcome to route /b!" });
});

app.get("/c", authorize("/c"), (req, res) => {
  res.send({ msg: "Welcome to route /c!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
