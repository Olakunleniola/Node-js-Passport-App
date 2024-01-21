# Node.js Passport App

## Project Overview

This web application demonstrates the use of Passport for authenticating users. It was developed during the Codecademy boot camp and utilizes various technologies to implement user authentication and authorization.

## Technologies Used

- **Passport:** A popular authentication middleware for Node.js. In this project, it's used to configure a local strategy for user authentication.

- **bcrypt-js:** A library for hashing and comparing passwords. It ensures the security of user passwords by converting them into hashed data.

- **Express.js:** A web application framework for Node.js. It's used to create APIs, including endpoints for handling user registration, login, and homepage.

- **Session:** Used to create user sessions, allowing the app to persist user data across requests.

- **Passport-local:** A strategy extracted from Passport for handling local authentication (e.g., using a username and password).

- **Flash:** Utilized for extracting error messages within the Passport middleware, providing feedback to users during authentication.

- **EJS (Embedded JavaScript):** Used as the view engine for rendering dynamic content on the server side.

- **Users.json:** The user data is stored and managed in this JSON file.

## Features

- **User Registration:** Allows users to create an account using a username and password.

- **User Login:** Users can log in with the credentials created during the registration process.

- **Homepage:** After logging in, users are redirected to the homepage where their username is displayed. The login and register buttons disappear for authenticated users.

- **CheckIsAuthenticated Middleware:** This middleware prevents logged-in users from accessing the "/users/login" and "/users/register" URLs again. If a user attempts to visit these links while logged in, they are redirected to the homepage.

- **Logout Functionality:** Users can log out by clicking the logout button on the homepage.

## API Endpoints

- `/`: The root endpoint.
- `/users/login`: Endpoint for user login.
- `/users/register`: Endpoint for user registration.

## Usage

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the application with `node start`.
4. Visit `http://localhost:4050` in your browser.

## Project Structure

The project structure includes files such as:

- `app.js`: The main entry point of the application.
- `data/users.json`: Stores user data.
- `views/`: Contains EJS templates for rendering views.
- `public/`: Holds static assets like stylesheets and images.

Feel free to explore the codebase and adapt it for your needs!

