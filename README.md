# 🚀 Smart Task Board App

## 📌 Overview

Smart Task Board App is a full-stack task management system built using React and .NET Web API. It helps users manage tasks efficiently 

---

## ✨ Features

* ✅ Create, Edit, Delete Tasks
* ✅ Task Status (To Do, In Progress, Review, Done)
* ✅ Priority Levels (Low, Medium, High)
* ✅ Drag & Drop Task Movement
* ✅ REST API Integration
* ✅ Database Storage (SQL Server)

---

## 🛠️ Tech Stack

### 🎨 Frontend

* React.js
* HTML, CSS, JavaScript
* Axios

### ⚙️ Backend

* .NET Core Web API
* Entity Framework Core
* Swagger (API Testing)

### 🗄️ Database

* SQL Server

---

## 📦 Packages Used

### 🔧 Backend (NuGet)

* Microsoft.EntityFrameworkCore
* Microsoft.EntityFrameworkCore.SqlServer
* Microsoft.EntityFrameworkCore.Tools
### 🎨 Frontend (npm)

* axios
* react-beautiful-dnd
* uuid

---

## 📂 Project Structure

smart-task-board-app/
│
├── frontend/      # React Application
├── backend/       # .NET Web API
├── database/      # SQL Scripts
└── README.md

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

git clone https://github.com/dhinakaran918/smart-task-board-app.git

---

### 2️⃣ Run Backend (.NET API)

* Open backend folder in Visual Studio
* change connection strings 
* Run the project
* Swagger will open in browser

---

### 3️⃣ Run Frontend (React)

cd frontend
npm install
npm start

---

### 4️⃣ Database Setup

* Open SQL Server
* Run scripts from `/database/db.sql`

---

## 🔌 API Details

* Base URL: [https://localhost:xxxx/api](https://localhost:xxxx/api)
* Endpoints:

  * GET /getalltaskapi
  * POST /createtaskapi
  * PUT /updatetaskapi/{id}
  * DELETE /deletetaskapi  /{id}

---

## 📸 Screenshots

<img width="1301" height="600" alt="image" src="https://github.com/user-attachments/assets/58c2fb7f-d7f8-477f-aa95-5c3599e15c99" />
<img width="1302" height="590" alt="image" src="https://github.com/user-attachments/assets/c2a3ab9c-4009-4bad-a721-0f86bff78e94" />


---

## 👨‍💻 Author

Dhinakarachanthiran

---

## ⭐ Notes

This project demonstrates full-stack development including frontend UI, backend API, and database integration. Suitable for real-world task management scenarios 
