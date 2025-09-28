Alignbox Chat Assignment
This is a full-stack real-time chat application built as a submission for the Alignbox assignment. The project features a user interface based on the provided Figma design and is powered by a Node.js backend with a MySQL database.
<img width="667" height="796" alt="image" src="https://github.com/user-attachments/assets/630b0d5a-ea28-4521-94b7-aade3087eb4a" />


Features
Real-time Messaging: Send and receive messages instantly.

Persistent Chat History: All messages are stored in a MySQL database and loaded on startup.

Figma-based UI: The user interface is styled to closely match the provided design, including message bubbles, colors, and layout.

Full-Stack Implementation: Complete frontend (HTML, CSS, JS) and backend (Node.js, Express) architecture.

REST API: Simple API for fetching and posting messages.

Technology Stack
Frontend: HTML5, CSS3, JavaScript (ES6)

Backend: Node.js, Express.js

Database: MySQL

Icons: Font Awesome

Prerequisites
Before you begin, ensure you have the following installed on your system:

Node.js (which includes npm)

[suspicious link removed] and a client like MySQL Workbench

Setup and Installation
Follow these steps to get the application running on your local machine.

1. Clone the Repository
git clone <your-github-repo-url>
cd alignbox-chat-assignment

2. Install Dependencies
Install the required Node.js packages using npm.

npm install express mysql

3. Set Up the Database
You need to create a database and a table to store the messages.

Open your MySQL client (like MySQL Workbench) and connect to your database server.

Run the following SQL commands to create the database and the messages table:

-- Create the database
CREATE DATABASE chat_app;

-- Use the newly created database
USE chat_app;

-- Create the messages table
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message TEXT NOT NULL,
    sender VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- (Optional) For modern MySQL versions, run this to ensure compatibility with the Node.js driver
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;


Note: Replace 'your_password' with your actual MySQL root password.

4. Configure the Server
Open the server.js file and update the database connection details with your MySQL credentials.

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password', // <-- IMPORTANT: Update this with your password
    database: 'chat_app'
});

5. Run the Application
Start the Node.js server from your project's root directory.

node server.js

You should see the following output in your terminal:

MySQL Connected...
Server is running on http://localhost:3000

You can now access the application by navigating to http://localhost:3000 in your web browser.
