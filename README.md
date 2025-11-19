# 🛒 Small Basket

**Small Basket** is a full-stack vegetable shopping cart application built with a modular microservices architecture.  
It allows users to log in, browse available vegetables, select quantities, and complete purchases—all while tracking user-specific carts and orders.  
The application is containerized with Docker and ready for deployment on Kubernetes.

---

## 📁 Directory Structure
```
small-basket/

├── docker-compose.yaml        # Compose file to run full stack locally

├── small-basket-database/     # MySQL service with schema initialization
│   ├── init.sql
│   └── Dockerfile

├── small-basket-backend/      # Node.js + Express API
│   ├── server.js
│   ├── db.js
│   ├── routes/
│   │   └── api.js
│   ├── .env
│   └── Dockerfile

├── small-basket-frontend/     # React frontend
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Checkout.js
│   │   │   └── Success.js
│   └── Dockerfile

└── README.md                  # Project documentation
```
---

## 🚀 Microservices Overview

| Service Name           | Port | Description                          | Docker Hub Image                                                                 |
|------------------------|------|--------------------------------------|----------------------------------------------------------------------------------|
| small-basket-database  | 3306 | MySQL database with schema init      | `docker pull kesaripatil/small-basket-database:latest`                           |
| small-basket-backend   | 5000 | Express API for vegetables & checkout| `docker pull kesaripatil/small-basket-backend:latest`                            |
| small-basket-frontend  | 3000 | React UI for login, cart, checkout   | `docker pull kesaripatil/small-basket-frontend:latest`                           |

---

## 🔐 Environment Variables

### `small-basket-backend/.env`

```env
DB_HOST=small-basket-database
DB_USER=root
DB_PASS=yourpassword
DB_NAME=vegshop
```
---

## 🧱 Database Initialization
The database is automatically provisioned using init.sql when the MySQL container starts. It creates the following tables:

users (id, name, created_at)

vegetables (id, name, price, available, created_at, updated_at)

checkout (id, vegetable_id, quantity, total_price, user_id, created_at, paid)

---

## 📦 Deployment Notes
Docker Compose: A docker-compose.yaml file is included to run the full stack locally.

Kubernetes: Manifests are provided in the repository for deploying the stack on a cluster.

`Ports:`

Frontend → 3000

Backend → 5000

Database → 3306

---

## ⚠️ Disclaimer
This application was generated with the help of generative AI. The concept and execution flow are original ideas. Any similarity to other implementations is purely coincidental.

---

## Docker Hub Images:

- [Backend](https://hub.docker.com/r/kesaripatil/small-basket-backend)
- [Frontend](https://hub.docker.com/r/kesaripatil/small-basket-frontend)
- [Database](https://hub.docker.com/r/kesaripatil/small-basket-database)
