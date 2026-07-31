# 🎓 Student Management System

A modern, responsive, and secure full-stack web application designed to manage student records. Built with a **Spring Boot REST API** backend, a **Next.js 16 (React 19)** frontend, and a cloud-hosted **MongoDB Atlas** database.

---

## 🛠️ Technology Stack

### Backend
* **Language & Framework**: Java 21 / Spring Boot 3.x
* **Security**: Spring Security + JWT (JSON Web Tokens)
* **Database Access**: Spring Data MongoDB (Object-document mapping)
* **Build Tool**: Maven

### Frontend
* **Framework**: Next.js 16 (App Router) / React 19
* **Styling**: Tailwind CSS v4 / Vanilla CSS Variables
* **Icons**: Lucide React
* **HTTP Client**: Axios (with interceptors for auth headers & auto-logout)

### Database
* **Type**: MongoDB Atlas (Cloud hosted, pre-configured out of the box)

---

## 🔑 Default Administrator Credentials

On initial startup, the backend automatically seeds a default administrator account:
* **Email**: `admin@student.com`
* **Password**: `admin123`

---

## 🚀 How to Run the Project from Scratch

Follow these steps to spin up both the backend services and the frontend client.

### Prerequisites
Make sure you have the following installed on your machine:
1. **Java Development Kit (JDK) 21** or higher.
2. **Node.js (v18.x or higher)** and `npm`.
3. **Git** (optional, for cloning).

---

### 📦 Step 1: Run the Backend API

The database is hosted on MongoDB Atlas in the cloud. The connection strings are already pre-configured in `backend/src/main/resources/application.properties`, so **no local database setup is required**.

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Compile and run the Spring Boot application:
   * **Windows (PowerShell/CMD)**:
     ```powershell
     .\mvnw.cmd spring-boot:run
     ```
   * **macOS / Linux**:
     ```bash
     chmod +x mvnw
     ./mvnw spring-boot:run
     ```

3. The backend server will start up and listen on **`http://localhost:8080`**.

---

### 🎨 Step 2: Run the Frontend Client

1. Open a new terminal window/tab and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install the package dependencies:
   ```bash
   npm install
   ```

3. Start the Next.js development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to **`http://localhost:3000`**.

---

## ✨ Features & Architecture Highlights

1. **Secure Access Guards**: JWT tokens protect all API routes. The frontend automatically attaches headers via Axios request interceptors and triggers an auto-logout on `401 Unauthorized` responses.
2. **Dynamic Live Dashboard**: Real-time stats are queried directly from MongoDB Atlas to display exact counts and recently registered student details.
3. **Manual Dark Mode Toggle**: Persistent dark/light styling switcher with manual local storage hooks to prevent screen flickering (FOUC).
4. **Clean Layout Alignment**: Balanced metrics cards (50/50 split) and a symmetrical 3x2 details grid profile view optimized for widescreen viewports.
5. **Responsive Viewport Scaling**: Flexbox boundaries prevent clipping and overflow issues on smaller screens/tablets, enabling smooth horizontal swiping on data tables.
6. **Sri Lankan Form Validations**: Enhanced regex checking (`/^(?:\+94|94|0)[1-9]\d{8}$/`) and age constraints (`min="1"`) active on both the client form inputs and backend request controllers.