# 🏥 Medical Management System (MERN + Supabase)

## 📌 Overview

This project is a **Medical Management System** built using the **MERN stack (MongoDB, Express, React, Node.js)** with **Supabase** as the backend database and authentication provider.
It helps manage patient records, appointments, and medical data efficiently in a secure and scalable way.

---

## 🚀 Features

* 🔐 User Authentication (Login/Signup with Supabase)
* 👩‍⚕️ Patient Management (Add, Update, Delete, View)
* 📅 Appointment Scheduling
* 📄 Medical Records Storage
* 🔎 Search & Filter Patients
* 📊 Dashboard Overview
* ☁️ Cloud-based database with Supabase
* 🔒 Secure API handling with Node.js & Express

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Axios
* Tailwind CSS / Bootstrap (choose yours)

### Backend

* Node.js
* Express.js

### Database & Auth

* Supabase (PostgreSQL + Auth)

---

## 📂 Folder Structure

```
project-root/
│
├── client/          # React frontend
│   ├── src/
│   └── public/
│
├── server/          # Node.js backend
│   ├── routes/
│   ├── controllers/
│   └── models/
│
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/medical-management.git
cd medical-management
```

### 2️⃣ Install dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the **server** folder and add:

```
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
```

---

## ▶️ Run the Application

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm start
```

---

## 📡 API Endpoints (Example)

| Method | Endpoint      | Description      |
| ------ | ------------- | ---------------- |
| GET    | /patients     | Get all patients |
| POST   | /patients     | Add new patient  |
| PUT    | /patients/:id | Update patient   |
| DELETE | /patients/:id | Delete patient   |

---

## 🔒 Security Features

* Supabase Authentication
* Environment variable protection
* Secure API routes
* Data validation & sanitization

---

## 📸 Screenshots

*Add screenshots of your UI here*

---

## 🌍 Future Improvements

* 🧠 AI-based diagnosis suggestions
* 📱 Mobile responsiveness improvements
* 📈 Advanced analytics dashboard
* 🔔 Notifications system

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repo and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Your Name
GitHub: https://github.com/Rajeshpatra12/Medicare-Connect-Hub

---

