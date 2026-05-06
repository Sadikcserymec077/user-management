# MERN User Management Dashboard

A complete, production-ready full-stack MERN (MongoDB, Express, React, Node.js) application built for internship assessment. It features a modern, responsive, and highly polished "dark admin" dashboard aesthetic using Tailwind CSS.

## 🌟 Features

### Backend (Express & MongoDB)
- **CRUD Operations**: Complete set of RESTful APIs for managing users.
- **Server-side Pagination**: Efficient fetching through `page` and `limit` query parameters.
- **Advanced Search**: Case-insensitive partial matching across multiple fields (name, email, mobile, location).
- **Profile Image Upload**: Integrated `multer` for secure, validated file uploads stored statically.
- **CSV Export**: Direct API to export the current user list as a downloadable `.csv` file using `json2csv`.
- **Validation & Error Handling**: Comprehensive validation via `express-validator` and global error handlers covering duplicate emails, payload limits, and invalid inputs.

### Frontend (React & Vite)
- **Modern UI/UX**: Premium dark glassmorphism design with responsive grids, hover micro-animations, and dynamic gradient avatars.
- **Routing**: Client-side routing via `react-router-dom` incorporating nested layouts.
- **State & API**: Centralized Axios configuration with automated error normalization and interception.
- **Reusable Components**: Clean architecture leveraging components like `UserTable`, `Pagination`, `SearchBar`, `ConfirmModal`, and `UserForm`.
- **Interactive Forms**: Full client-side regex validations mirroring backend rules.
- **Toast Notifications**: Integrated `react-toastify` for success and error feedback.

---

## 🛠 Tech Stack

**Frontend:** React, Vite, Tailwind CSS v4, React Router DOM, Axios, React Toastify, React Icons  
**Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose, Multer, json2csv, CORS, Dotenv, Express-Validator

---

## 📂 Folder Structure

```
mern-task/
├── client/                 # React Frontend
│   ├── public/
│   │   └── _redirects      # Netlify routing config
│   ├── src/
│   │   ├── components/     # Reusable UI elements
│   │   ├── layouts/        # Page wrappers
│   │   ├── pages/          # Main views
│   │   ├── services/       # Axios API layer
│   │   ├── App.jsx         # Router config
│   │   ├── main.jsx        # React entry
│   │   └── index.css       # Global Tailwind & design system
│   ├── tailwind.config.js
│   └── package.json
│
└── server/                 # Node/Express Backend
    ├── config/             # DB connection
    ├── controllers/        # Route logic
    ├── middleware/         # Uploads & Error handlers
    ├── models/             # Mongoose schemas
    ├── routes/             # API endpoints
    ├── services/           # Validation rules
    ├── uploads/            # Static image storage
    ├── utils/              # Response helpers
    ├── server.js           # Express entry point
    └── render.yaml         # Render deployment config
```

---

## 🚀 Setup Instructions

### 1. Requirements
Ensure you have **Node.js** (v18+) and a **MongoDB URI** ready.

### 2. Backend Setup
1. Open a terminal and navigate to the `server/` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file referencing `.env.example`:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=your_mongodb_connection_string
   CLIENT_URL=http://localhost:5173
   ```
4. Start the server (Dev mode):
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the `client/` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
5. Open your browser to `http://localhost:5173`

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/users` | Get paginated users (`?page=1&limit=8`) |
| `GET` | `/api/users/search` | Search users (`?query=john`) |
| `GET` | `/api/users/export/csv` | Download all users as CSV |
| `GET` | `/api/users/:id` | Get single user by ID |
| `POST` | `/api/users` | Add user (supports `multipart/form-data`) |
| `PUT` | `/api/users/:id` | Update user (supports `multipart/form-data`) |
| `DELETE` | `/api/users/:id` | Delete user and cleanup image file |

---

## 🌐 Deployment Plan

### Frontend (Netlify)
1. Push `client/` to GitHub.
2. Connect to Netlify.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add env var: `VITE_API_BASE_URL=https://your-backend-url.onrender.com/api`
*(Note: `public/_redirects` is already included to support SPA routing)*

### Backend (Render.com)
1. Connect the `server/` codebase to Render as a Web Service.
2. The `render.yaml` file configures the build and start commands automatically.
3. Provide the Environment Variables in the Render dashboard:
   - `MONGO_URI`
   - `CLIENT_URL` (Set this to your Netlify URL)

---

> Built as an assessment project to demonstrate full-stack capabilities, clean architecture, and modern UI engineering.
