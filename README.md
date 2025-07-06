# case-study-ride-hailing-backend

A mock backend built with **Node.js** and **Express.js** as part of the **Tech Pioneer Program 2025** case study.

## Overview

This project simulates a ride-hailing system with:
- Basic user authentication (sign up & login)
- Ride request lifecycle (request → accept → start → complete)
- In-memory data storage (no external database)
- Clear, testable REST API endpoints

It is designed to demonstrate backend design thinking, edge case handling, and realistic feature flows in a simplified format.

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/MustafaHZaidi/case-study-ride-hailing-backend.git
cd case-study-ride-hailing-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Server
```bash
node server.js
```

The server will start on `http://localhost:3000`

## Project Structure

```
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
└── README.md
```

## API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication

#### POST /auth/signup
Create a new user (passenger or driver)

**Request Body:**
```json
{
  "name": "Ali",
  "type": "passenger", // or "driver"
  "password": "mypassword"
}
```

#### POST /auth/login
Log in an existing user

**Request Body:**
```json
{
  "name": "Ali",
  "type": "passenger",
  "password": "mypassword"
}
```

### Ride Management

#### POST /rides/request
Request a new ride (passenger only)

**Request Body:**
```json
{
  "passengerId": 1,
  "pickup": "Mall Road",
  "drop": "Airport",
  "rideType": "Car"
}
```

#### POST /rides/:rideId/accept
Accept a ride request (driver only)

**Request Body:**
```json
{
  "driverId": 2
}
```

#### POST /rides/:rideId/reject
Reject a ride request (driver only)

**Request Body:**
```json
{
  "driverId": 2
}
```

#### POST /rides/:rideId/start
Start an accepted ride (driver only)

**Request Body:**
```json
{
  "driverId": 2
}
```

#### POST /rides/:rideId/complete
Complete a ride (driver only)

**Request Body:**
```json
{
  "driverId": 2
}
```

#### GET /rides/history/:userId
View all rides related to a user (passenger or driver)

**Response:**
```json
{
  "rides": [ ... ]
}
```

## Key Features

- User registration & login (mock passwords with hashing)
- Role-based logic (passenger vs driver)
- Ride request lifecycle:
- Requested → Accepted → InProgress → Completed
- Duplicate ride protection
- Simple error handling and validation
- Fully testable with Postman or any REST client

## Assumptions

- No actual database is used (in-memory only)
- No sessions or tokens — user IDs are passed manually
- Ride status is linear and irreversible
- Focus is on logic, not persistence or security

## Suggested Future Improvements

- JWT-based authentication
- Replace mock DB with MongoDB or PostgreSQL
- Prevent race conditions in ride acceptance
- Add support for ride cancellation
- Add ratings, estimated fare, and distance
- Add driver matching based on location

## Submission Includes

- GitHub repo with complete code
- Demo video walking through implementation, features, and testing

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JavaScript** - Programming language
- **In-memory storage** - Data persistence
