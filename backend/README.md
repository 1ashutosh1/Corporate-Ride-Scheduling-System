# Corporate Ride Scheduling System Backend

This is the backend API for the Corporate Ride Scheduling System, built with Node.js, Express, and MongoDB.

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Auth
- Swagger (OpenAPI)
- Deployed on Render


## 🌍 Deployment (Render)

This backend is deployed on Render:

- **Render URL:** [https://corporate-ride-scheduling-system-backend.onrender.com](https://corporate-ride-scheduling-system-backend.onrender.com)
- **Swagger Docs:** [https://corporate-ride-scheduling-system-backend.onrender.com/api-docs](https://corporate-ride-scheduling-system-backend.onrender.com/api-docs)

- Auto-deploys from GitHub on every push

## Features

- User registration, login, and profile management
- Ride booking, viewing, and cancellation
- Admin dashboard for ride management and analytics
- JWT-based authentication and role-based access control
- Swagger API documentation

## Getting Started

### Prerequisites

- Node.js (v16 or above recommended)
- MongoDB database (local or cloud)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/1ashutosh1/Corporate-Ride-Scheduling-System.git
   cd Corporate-Ride-Scheduling-System/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following:
   ```env
   PORT=3000
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```

### Running the Server

```sh
npm start
### or
npm run dev
```

The server will run on the port specified in your `.env` file.

### API Documentation

Swagger UI is available at [`/api-docs`](http://localhost:3000/api-docs) after starting the server.

## Project Structure

```
backend/
  index.js
  package.json
  swagger.js
  config/
    db.js
  controllers/
    adminController.js
    rideController.js
    userController.js
  middleware/
    auth.js
    errorHandler.js
    isAdmin.js
  models/
    AdminAction.js
    Ride.js
    User.js
  routes/
    adminRoutes.js
    rideRoutes.js
    userRoutes.js
  utils/
    authUtil.js
```

## 📬 API Endpoints (Examples)

### 👤 Auth

- `POST /users/register`
- `POST /users/login`
- `GET /users/profile` (protected)
- `PATCH /users/update` (protected)

### 🚕 Rides

- `POST /rides/bookRide`
- `GET /rides/getUserRides`
- `GET /rides/getRideDetails/:id`
- `DELETE /rides/cancel/:id`

### 🔧 Admin

- `GET /admin/rides`
- `PATCH /admin/approve/:id`
- `PATCH /admin/reject/:id`
- `GET /admin/analytics`
- `GET /admin/users`

## 👨‍💻 Author

Made with ❤️ by [Ashutosh Tripathi](https://github.com/1ashutosh1)


## License  

MIT
