# case-study-ride-hailing-backend

A mock backend built with **Node.js** and **Express.js** as part of the **Tech Pioneer Program 2025** case study.

This project simulates a ride-hailing system with:
- Basic user authentication (sign up & login)
- Ride request lifecycle (request → accept → start → complete)
- In-memory data storage (no external database)
- Clear, testable REST API endpoints

It is designed to demonstrate backend design thinking, edge case handling, and realistic feature flows in a simplified format.

1. **Clone the Repository**
   git remote set-url origin https://github.com/MustafaHZaidi/case-study-ride-hailing-backend.git
   cd case-study-ride-hailing-backend

2. **Install Dependencies**
   npm install

3. **Run the Server**
   node server.js

** Project Structure **
├── controllers/
│   ├── authController.js
│   └── rideController.js
├── data/
│   └── mockData.js
├── models/
│   ├── User.js
│   └── Ride.js
├── routes/
│   ├── authRoutes.js
│   └── rideRoutes.js
├── app.js
├── server.js
├── .gitignore
├── README.md

** BASE URL **
http://localhost:3000/api

