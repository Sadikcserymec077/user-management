# MERN User Management Dashboard

A complete production-ready Full Stack MERN (MongoDB, Express.js, React.js, Node.js) User Management Dashboard built for the Full Stack Intern (MERN) Assessment Task.

The application provides a modern responsive admin dashboard UI with complete CRUD operations, server-side pagination, search functionality, CSV export, image upload support, validation, notifications, and deployment configuration.

---

# 🔗 Live Demo

Frontend: https://your-netlify-url.netlify.app

Backend API: https://your-render-url.onrender.com/api/users

---

# 🌟 Features

## ✅ Backend Features
- Complete CRUD APIs
- MongoDB Atlas integration
- Server-side pagination using `skip()` and `limit()`
- Search API with case-insensitive partial matching
- CSV export using `json2csv`
- Profile image upload using `multer`
- Global error handling
- Request validation using `express-validator`
- Static image serving
- Proper REST API architecture
- Environment variable support
- Production deployment configuration

---

## ✅ Frontend Features
- Modern dark admin dashboard UI
- Fully responsive design (Mobile, Tablet, Desktop)
- React Router DOM multi-routing
- Reusable component architecture
- Search functionality
- Pagination controls
- Add/Edit/View user pages
- Delete confirmation modal
- Toast notifications using `react-toastify`
- Loading states and spinners
- Empty state UI
- Image preview functionality
- Tailwind CSS styling
- Axios centralized API handling

---

# 🛠 Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Toastify
- React Icons

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Multer
- json2csv
- Express Validator
- Dotenv
- CORS

---

# 📸 Screenshots

## Dashboard
![Dashboard](./screenshots/dashboard.png)

## Add User Page
![Add User](./screenshots/add-user.png)

## View User Page
![View User](./screenshots/view-user.png)

---

# 📂 Project Structure

```bash
mern-user-management/
│
├── client/
│   ├── public/
│   │   └── _redirects
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── tailwind.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── utils/
│   ├── render.yaml
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 🚀 Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
```

---

# ⚙️ Backend Setup

## Navigate to Server

```bash
cd server
```

## Install Dependencies

```bash
npm install
```

## Create `.env` File

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_atlas_uri
CLIENT_URL=http://localhost:5173
```

## Run Backend

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# 💻 Frontend Setup

## Navigate to Client

```bash
cd client
```

## Install Dependencies

```bash
npm install
```

## Create `.env` File

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users` | Get paginated users |
| GET | `/api/users/search` | Search users |
| GET | `/api/users/export/csv` | Export users CSV |
| GET | `/api/users/:id` | Get single user |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

---

# 📄 API Examples

## Pagination

```bash
GET /api/users?page=1&limit=5
```

## Search

```bash
GET /api/users/search?query=sadik
```

---

# 📱 Responsive Design

The application is fully responsive and optimized for:

- Mobile Devices
- Tablets
- Desktop Screens

Implemented using Tailwind CSS responsive utilities:
- `sm:`
- `md:`
- `lg:`
- `xl:`

---

# ✅ Validation Features

## Frontend Validation
- Required field validation
- Email validation
- Mobile number validation
- Image type validation

## Backend Validation
- Duplicate email prevention
- Request payload validation
- Image MIME type validation
- Error response handling

---

# 🔔 Notifications

The application uses `react-toastify` for:
- Success notifications
- Error alerts
- Delete confirmations
- Validation messages

---

# 📤 CSV Export

Users can export all records as CSV using:

```bash
/api/users/export/csv
```

The CSV file downloads automatically with timestamped filename.

---

# 🖼 Image Upload

Image upload functionality includes:
- Multer integration
- File type validation
- Static image serving
- Profile image preview
- Image cleanup during delete/update

---

# 🌐 Deployment

## Frontend Deployment (Netlify)

### Build Command

```bash
npm run build
```

### Publish Directory

```bash
dist
```

### Environment Variable

```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
```

### Netlify Redirect Configuration

Create:

```bash
public/_redirects
```

Add:

```bash
/* /index.html 200
```

---

# 🚀 Backend Deployment (Render)

## Environment Variables

```env
MONGO_URI=your_mongodb_uri
CLIENT_URL=https://your-netlify-url.netlify.app
PORT=5000
```

## Deployment Features
- Render Web Service
- MongoDB Atlas connection
- Static upload support
- Production-ready API configuration

---

# 🧪 Features Verified

✅ CRUD Operations  
✅ Backend Pagination  
✅ Search API  
✅ CSV Export  
✅ Responsive Design  
✅ Multi Routing  
✅ Form Validation  
✅ Image Upload  
✅ Notifications  
✅ Error Handling  
✅ Deployment Working  
✅ Component-Based Architecture  

---

# 👨‍💻 Author

K Mohammad Sadik

Built as part of the Full Stack Intern (MERN) Assessment Task for Bits and Volts Pvt. Ltd.

---

# 📌 Notes

- Built using MERN Stack architecture
- Designed with reusable scalable components
- Follows clean code and modular architecture practices
- Developed with focus on responsiveness and production-quality UI
