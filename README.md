# StockMate Inventory Web

![StockMate](https://img.shields.io/badge/StockMate-MERN-green) ![License](https://img.shields.io/badge/License-ISC-blue)

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview
StockMate is a **MERN stack inventory management system** designed for small and medium businesses. It allows staff and admins to manage **items, categories, sales, and generate detailed reports**. The application supports **JWT authentication**, **email verification via Resend**, and **cloud-based image uploads with Cloudinary**.  

---

## Features

### User Authentication & Authorization
- JWT-based login/logout
- Email OTP verification via Resend
- Password reset functionality
- Role-based access (Admin vs Staff)

### Inventory Management
- Add, edit, delete items and categories (admin only)
- Image uploads via Cloudinary
- Filter items by category & search by name
- Stock tracking with low-stock alerts

### Sales Management
- Record sales for items
- Edit & delete sales (admin only)
- Search sales by seller or item name
- Filter sales by date

### Reporting & Analytics
- Sales by item/category
- Top-selling & low-stock items
- Revenue analytics (dynamic doughnut chart)
- Sales overview line chart over months
- Advanced KPIs for admins

### Account Management
- Update personal details
- Change password
- Admins can grant/revoke admin roles

---

## Tech Stack
**Frontend:** React, TailwindCSS, React Router, React Query, Redux Toolkit, Chart.js, React Hot Toast  
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Resend (email OTP), Cloudinary  
**Tools:** Vite, Nodemon, ESLint  

---

## Installation

### Backend Setup
1. Navigate to backend folder:
```bash
cd backend
Install dependencies:

bash
Copy code
npm install
Start development server:

bash
Copy code
npm run dev
Default backend URL: http://localhost:5000

Environment variables: Create a .env file with MongoDB URI, JWT secret, Cloudinary, and Resend API keys

Frontend Setup
Navigate to frontend folder:

bash
Copy code
cd frontend
Install dependencies:

bash
Copy code
npm install
Start development server:

bash
Copy code
npm run dev
Default frontend URL: http://localhost:5173

Usage
Open the frontend in your browser

Register a new user or log in

Admin users can:

Add/edit/delete categories and items

Grant/revoke admin roles

View revenue analytics and sales overview charts

Staff users can:

Manage sales

View reports and stock analytics

Screenshots
Dashboard

Revenue Analytics (Dynamic Doughnut Chart)

Sales by Category (Dynamic Doughnut Chart)

Sales Overview Over Months (Line Chart)

Top Selling Items (Vertical Chart)

Low Stock Items (Vertical Chart)

Sales by Date

Contributing
Contributions are welcome!

Fork the repository

Create a new branch:

bash
Copy code
git checkout -b feature-name
Commit your changes:

bash
Copy code
git commit -m 'Add feature'
Push to branch:

bash
Copy code
git push origin feature-name
Open a Pull Request

License
This project is licensed under the ISC License.