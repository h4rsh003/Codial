<div align="center">

# 🚀 Codial - Developer Community Platform
### Showcase your work, share projects, and gain inspiration from peers.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://codial-woad.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)](https://github.com/h4rsh003/codial)

**The stage for developers to ship their work and grow their community.**

</div>

---

### 📖 Overview
**Codial** is a full-stack developer community platform engineered to empower developers by providing a space to showcase portfolios and project architectures. Built using the **MERN stack**, the platform allows users to document their technical journey, gain inspiration, and ship their work to a global audience.



---

### 🌟 Features

- **🔐 Secure Authentication:** Developed a secure RESTful API with **Node.js** and **Express**, integrating **JWT** authentication for protected routes and persistent sessions.
- **🎨 Project Showcase:** Enables users to showcase portfolios with rich details, including tech stacks, live links, and GitHub repositories.
- **🔍 Smart Exploration:** Implemented real-time search and filtering capabilities to optimize data retrieval from **MongoDB** using **Mongoose**.
- **⚡ State Management:** Architected a modular frontend implementing **Zustand** for efficient, global client-side state management.
- **🧩 Scalable Architecture:** Developed using reusable **Compound Components** and a modular structure to ensure a maintainable codebase.
- **📱 Fully Responsive:** Designed a highly interactive and responsive UI using **Tailwind CSS** and a mobile-first approach.

---

### 🛠️ Tech Stack

| **Frontend** | **Backend** | **Database & Security** |
| :--- | :--- | :--- |
| **React.js** | **Node.js** | **MongoDB** |
| **Tailwind CSS** | **Express.js** | **Mongoose** (ODM) |
| **Zustand** | **RESTful API** | **JWT** & **Bcrypt.js** |
| **React Router** | **Postman** | **Vercel** & **Render** |

---

### 📂 Project Structure

```text
codial/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI (Navbar, Cards, Compound Components)
│   │   ├── pages/          # Home, Explore, Dashboard, Login
│   │   ├── stores/         # Zustand stores (User Auth, Project Feeds)
│   │   └── App.tsx         # Main Routing Logic
│
├── server/                 # Express Backend
│   ├── controllers/        # Request logic and business rules
│   ├── models/             # Mongoose schemas (User, Project)
│   ├── routes/             # API Endpoints
│   └── middleware/         # JWT Auth & Validation

```

---

### ⚙️ Getting Started

1. **Clone the Repository**
```bash
git clone [https://github.com/h4rsh003/Codial.git](https://github.com/h4rsh003/Codial.git)
cd codial

```


2. **Backend Setup**
```bash
cd server
npm install

```


*Create a `.env` in the server folder with your `PORT`, `MONGO_URI`, and `JWT_SECRET`.*
```bash
npm run dev

```


3. **Frontend Setup**
```bash
cd ../client
npm install
npm run dev # Starts on http://localhost:5173

```



---

### 👨‍💻 Author

**Harsh Shrivastava**

* **GitHub:** [@h4rsh003](https://github.com/h4rsh003)
* **LinkedIn:** [Harsh Shrivastava](https://www.linkedin.com/in/harsh-shrivastava003)
* **Email:** harshshrivastava003@gmail.com

---

<p align="center">Made with ❤️ for the Developer Community</p>
