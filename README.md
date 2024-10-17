# 📝 Task Management Application

## 🌟 Overview

Welcome to the **Task Management Application**! 🎉 This app allows users to manage their tasks based on roles (Admin and User). Admins can oversee all tasks and users, while regular users can manage only their tasks.

## ⚡ Features

- **🔒 User Authentication:** JWT-based authentication for secure login and registration.
- **👥 Role Management:** Two roles - Admin and User, with distinct permissions.
- **✅ Task Management:** Create, update, delete, and view tasks with due dates and statuses.
- **🔢 Task Limitation:** Regular users can create a maximum of **10 tasks**.
- **✉️ Password Reset:** Users can reset their passwords via email notifications.
- **🔍 Advanced Querying:** Filter and sort tasks using query parameters.
- **🚫 Rate Limiting:** Protection against brute-force attacks.
- **🛡️ Security Headers:** Enhanced security using Helmet.js.

## 🛠️ Technologies Used

- **🔙 Backend:** Node.js, Express
- **💾 Database:** MongoDB
- **🔑 Authentication:** JSON Web Tokens (JWT)
- **📧 Email Service:** Nodemailer
- **🧪 Testing Framework:** Jest
- **🔒 Security:** Helmet.js, Express-rate-limit

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB**
- **npm** (Node package manager)

## 🛠️ Installation Instructions  

Follow these steps to set up the project locally:

1. **Clone the Repository:**  
   ```bash
   git clone https://github.com/MaulikPatel63/TaskManager.git
   cd TaskManager
   ```

2. **Install Dependencies:**  
   Make sure you have **Node.js** and **MongoDB** installed. Then run:  
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**  
   Create a `.env` file in the project root and add the following environment variables:  
   ```plaintext
   PORT=5000  
   MONGODB_URI=<your_mongo_database_uri>  
   JWT_SECRET=<your_jwt_secret_key>
   EMAIL_USER=<your_email>
   EMAIL_PASS=<your_email_password>
   NODE_ENV=development
   ```

4. **Run the Server:**  
   Start the backend server with Nodemon for live reloading:  
   ```bash
   npm start
   ```
   Your server should now run at [http://localhost:5000](http://localhost:5000).

---

## 📡 API Endpoints

####  1. **User Registration:**
 - ##### POST /api/v1/auth/signup
     - ######  Request Body: { "username": "string", "email": "string", "password": "string" }

------------

#### 2. **User Login:**
 - ##### POST /api/v1/auth/login
     - ###### Request Body: { "email": "string", "password": "string" }
	 
  ------------

#### 3. **User Task:**
  - ##### POST /api/v1/task/task-add
      - ###### Request Body: { "title": "string","description": "string","dueDate": "date","category": "string" }
	  
------------

#### 4. **Get User Task:**
   - #####GET /api/v1/task/task-get
   
------------

#### 5. **Update Task:**-
  - ##### put /api/v1/task/task-update
      - ######  Request Body: { "title": "string","description": "string","dueDate": "date","category": "string","status": "string" }
	  
------------

#### 6. **Delete Task:**
   - ##### GET /api/v1/task/task-delete
   - 
## 📦 Postman Collection
- A Postman collection is included in the [docs](https://github.com/MaulikPatel63/TaskManager/blob/server/docs/TaskManager.postman_collection.json) directory for testing the API endpoints.


## 🌍 Deployment
The backend is deployed on Heroku (link to your live app).

## 🔐 Security Measures
Implemented JWT for secure authentication.
Used Helmet.js to set various HTTP headers for security.
Rate limiting implemented to protect against brute-force attacks.
