# Book_Exchange_Platform

**Overview -**
This is a Book Exchange Platform that allows users to send and receive book exchange requests, track their exchange transactions, and manage ongoing exchanges. The platform is built using React for the frontend and Node.js with Express for the backend. MongoDB is used as the database.

**Tech Stack -**
Frontend: React
Backend: Node.js, Express.js
Database: MongoDB
Other: Axios (for API requests), Mongoose (for MongoDB), React Router (for navigation)

**Requirements -**
To run this app locally, you need to have the following installed:
Node.js (v14.x or above)
MongoDB (Make sure MongoDB is running locally or provide the MongoDB URI)
npm (Node Package Manager)

**Installation -**
Step 1: Clone the Repository
git clone https://github.com/your-username/book-exchange-platform.git
cd book-exchange-platform

Step 2: Install Backend Dependencies
Navigate to the backend folder and install the required dependencies:
cd backend
npm install

Step 3: Install Frontend Dependencies
Navigate to the frontend folder and install the required dependencies:
cd ../frontend
npm install

**Running the App -**
Step 1: Set up Environment Variables
Before starting the app, you need to create environment variables for both the backend and frontend.

Step 2: Run Backend Server
Navigate to the backend folder and start the backend server:
cd backend
npm run dev

The backend will start running on http://localhost:5000.

Step 3: Run Frontend Server
Open a new terminal, navigate to the frontend folder, and start the React development server:
cd frontend
npm start

The frontend will start running on http://localhost:3000.

Step 4: Access the App
Frontend: http://localhost:3000
Backend (API): http://localhost:5000/api

