# 💰 SpendSmart: AI-Powered Financial Dashboard

SpendSmart is a professional **Full-Stack MERN Application** designed to help users track their financial health. Unlike basic trackers, it features a **Smart Logic Engine** that monitors spending habits and provides real-time suggestions using visual data analytics.

---

## 🚀 Key Features

- **📊 Visual Dashboard:** Integrated `Recharts` to provide a Pie Chart breakdown of spending distribution.
- **🤖 Smart Suggestion Engine:** A custom logic layer that analyzes "Food" expenses and warns the user if they exceed a specific budget threshold.
- **⚡ Real-time CRUD:** Add and delete transactions with instant UI updates using React State.
- **📁 Categorization:** Organize data into Food, Salary, Shopping, and Bills for better clarity.
- **📱 Responsive UI:** A modern, mobile-first design built with clean CSS3 and Flexbox.

---

## 🛠️ Tech Stack

**Frontend:**
- **React (Vite):** Modern UI framework.
- **Axios:** For seamless API communication.
- **Recharts:** For data visualization.
- **CSS3:** Custom professional styling with responsive media queries.

**Backend:**
- **Node.js & Express:** High-performance server environment.
- **Mongoose:** Object Data Modeling (ODM) for MongoDB.
- **CORS:** Secure cross-origin resource sharing.
- **Dotenv:** For protecting sensitive database credentials.

**Database:**
- **MongoDB:** NoSQL document-based database for scalable data storage.

---

## 📂 Project Structure

```text
Expanse-Tracker/
├── backend/
│   ├── models/        # Mongoose Schemas (Expense.js)
│   ├── routes/        # API Routes (expenseRoutes.js)
│   ├── server.js      # Main Entry Point
│   └── .env           # Database Credentials (Hidden)
└── frontend/
    ├── src/
    │   ├── App.jsx    # Dashboard Logic & UI
    │   ├── App.css    # Professional Styles
    │   └── main.jsx   # React Entry Point
    └── index.html
