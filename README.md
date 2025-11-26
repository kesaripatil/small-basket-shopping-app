# 🛒 Small Basket

**Small Basket** is a full-stack vegetable shopping cart application built with a modular microservices architecture.  
It allows users to log in, browse available vegetables, select quantities, and complete purchases—all while tracking user-specific carts and orders.  
The application is containerized with Docker and ready for deployment on Kubernetes.

---

## 📁 Directory Structure
```
small-basket/

├── docker-compose.yaml                  # Compose file to run full stack locally

├── k8s-deployment-manifests/            # Kubernetes manifests for cluster deployment
│   ├── backend-deployment.yaml          # Backend Deployment + Service
│   ├── database-deployment.yaml         # Database Deployment + Service
│   ├── frontend-deployment.yaml         # Frontend Deployment + Service
│   ├── db-secret.yaml                   # Secret for DB credentials
│   ├── small-basket-namespace.yaml      # Namespace definition
│   ├── small-basket-ingress.yaml        # Ingress for routing frontend + backend
│   └── small-basket-healthz-ingress.yaml# Ingress for health checks

├── small-basket-database/               # MySQL service with schema initialization
│   ├── init.sql
│   └── Dockerfile

├── small-basket-backend/                # Node.js + Express API
│   ├── server.js
│   ├── db.js
│   ├── routes/
│   │   └── api.js
│   ├── .env
│   └── Dockerfile

├── small-basket-frontend/               # React frontend
│   ├── public/
│   ├── src/
|   |   |__ App.css 
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Checkout.js
│   │   │   └── Success.js
│   └── Dockerfile

├── deploy-small-basket-on-k8s.sh        # Script to apply manifests in sequence
├── cleanup-small-basket-on-k8s.sh       # Script to delete manifests in reverse order

└── README.md                            # Project documentation
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
## 🚀 Kubernetes Deployment Scripts

To simplify cluster operations, two helper scripts are included at the root:

- `deploy-on-k8s.sh` → Applies all manifests in sequence:
  1. Namespace
  2. Secrets
  3. Database, Backend, Frontend Deployments
  4. Ingress
  5. Healthcheck ingress

- `cleanup-on-k8s.sh` → Deletes all manifests in reverse order for a clean teardown.

### Usage
Make scripts executable:
```bash
chmod +x deploy-on-k8s.sh cleanup-on-k8s.sh
```

### Run deployment:
```bash
./deploy-small-basket-on-k8s.sh
```

### Run cleanup:
```bash
./cleanup-small-basket-on-k8s.sh

```
---

## ⚠️ Disclaimer
This application was generated with the help of generative AI. The concept and execution flow are original ideas. Any similarity to other implementations is purely coincidental.

---

## Docker Hub Images:

- [Backend](https://hub.docker.com/r/kesaripatil/small-basket-backend)
- [Frontend](https://hub.docker.com/r/kesaripatil/small-basket-frontend)
- [Database](https://hub.docker.com/r/kesaripatil/small-basket-database)
