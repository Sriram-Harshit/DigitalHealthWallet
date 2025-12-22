# Digital Health Wallet 🏥

Digital Health Wallet is a full-stack web application designed to securely store, manage, and track personal health information such as medical reports and vital health metrics. It provides users with a centralized platform to monitor their health data digitally instead of relying on physical records.

This project is built as a learning-focused, real-world style application demonstrating full-stack development with authentication, database management, and a responsive user interface.

---

## 🚀 Features

- User Registration and Login (JWT Authentication)
- Secure storage of medical reports
- Vitals tracking (Blood Sugar, Blood Pressure, Heart Rate)
- Dashboard with health summary
- Recent reports and activity overview
- Responsive and clean UI
- RESTful backend APIs

---

## 🛠 Tech Stack

### Frontend

- React
- Axios
- Recharts
- CSS (Custom styling)

### Backend

- Node.js
- Express.js
- SQLite
- JWT (JSON Web Tokens)
- Multer (for file uploads)

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/DigitalHealthWallet.git
cd DigitalHealthWallet
```
````

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm start
```

Backend runs at:

```
http://localhost:5000
```

---

### 3. Frontend Setup

Open a new terminal window:

```bash
cd frontend
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

## 🔌 API Endpoints

### Authentication

- POST `/api/users/register`
- POST `/api/users/login`

### Dashboard

- GET `/api/dashboard`

### Vitals

- POST `/api/vitals`
- GET `/api/vitals`

### Reports

- POST `/api/reports`
- GET `/api/reports`

All protected routes require this header:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## 🧪 How to Use the Application

1. Register a new user account
2. Login using registered credentials
3. Access the dashboard to view:

   - Total uploaded reports
   - Logged vitals
   - Recent activity

4. Add vitals such as blood sugar, blood pressure, and heart rate
5. Upload and manage medical reports
6. Track health data over time using charts

---

## 🔐 Security

- Passwords are securely hashed using bcrypt
- JWT-based authentication for protected routes
- Sensitive files such as `.env`, database files, uploads, and `node_modules` are ignored from version control

---
