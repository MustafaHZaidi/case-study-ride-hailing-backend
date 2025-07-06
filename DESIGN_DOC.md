# Ride Hailing Backend – Design Document

## 1. Tech Stack Used & Why

- **Node.js + Express**: Chosen for its lightweight and fast setup, ideal for prototyping backend APIs.
- **In-Memory Database**: We used simple in-memory arrays to simulate persistent data (users and rides). This keeps the project light and fulfills the case study's requirement without over-engineering.
- **JavaScript Classes (Models)**: Used to represent `User` and `Ride` objects, making the code cleaner and slightly OOP-driven.
- **Postman**: Used to test all RESTful endpoints easily and consistently.

---

## 2. Assumptions Made

- **Authentication** is basic and handled via mocked login with bcrypt-encrypted passwords.
- **No persistent database** is used. All data resets when the server restarts.
- **No frontend** – API-only solution as allowed in the case study.
- A user cannot request a new ride if they already have one in progress (`Requested`, `Accepted`, or `InProgress`).
- Ride lifecycle is limited to `Requested`, `Accepted`, `Rejected`, and `Completed`. )
- Drivers must exist and be of type `'driver'` to accept or reject rides.

---

## 3. Entity Relationship Model

```plaintext
+------------+          +-----------+
|   User     |          |   Ride    |
+------------+          +-----------+
| id         |<-------->| id        |
| name       |          | passengerId |
| type       |          | driverId  |
| password   |          | pickup    |
+------------+          | drop      |
                        | rideType  |
                        | status    |
                        +-----------+
