# 🛒 Small Basket

**Small Basket** is a full-stack vegetable shopping cart application built with a modular microservices architecture.  
It allows users to log in, browse available vegetables, select quantities, and complete purchases—all while tracking user-specific carts and orders.  
The application is containerized with Docker and ready for deployment on Kubernetes.

---
## 📁 Directory Structure
```

small-basket-shopping-app/
|-- README.md                               # Project Documentation
|-- cleanup-small-basket-on-k8s.sh          # Tear down the deployment
|-- deploy-small-basket-on-k8s.sh           # Deploy services in sequence
|-- docker-compose.yaml                     # Compose file for local setup
|-- install-ingress-controller-add-on.sh    # Install ingress add-on
|-- k8s-deployment-manifests                # Service manifests
|   |-- backend-deployment.yaml             # Backend service deployment + service manifest
|   |-- database-deployment.yaml            # Database service PV + PVC + Deployment + Service manifest 
|   |-- db-secret.yaml                      # Database service secrets and configmaps
|   |-- frontend-config.yaml                # Configmap for frontend service config.js file
|   |-- frontend-deployment.yaml            # Frontend service deployment + service manifest
|   |-- small-basket-healthz-ingress.yaml   # Health endpoint ingress
|   |-- small-basket-ingress.yaml           # Ingress for frontend + backend service
|   |-- small-basket-namespace.yaml         # Namespace manifest
|   `-- vegdb-mysql-init-configmap.yaml     # Database service init.sh configmap
|-- small-basket-backend                    # Backend service source code [Express + Node]
|   |-- Dockerfile
|   |-- db.js
|   |-- package.json
|   |-- routes
|   |   `-- api.js
|   `-- server.js
|-- small-basket-database                   # Database service [Unused]
|   |-- Dockerfile
|   `-- init.sql
`-- small-basket-frontend                   # Frontend service source code [React]
    |-- Dockerfile
    |-- package.json
    |-- public
    |   |-- config.js
    |   `-- index.html
    `-- src
        |-- App.css
        |-- App.js
        |-- index.js
        `-- pages
            |-- Checkout.js
            |-- Dashboard.js
            |-- Login.js
            `-- Success.js

```

---
## 🚀 Microservices Overview

| Service Name           | Port | Description                          | Docker Hub Image                                                                 |
|------------------------|------|--------------------------------------|----------------------------------------------------------------------------------|
| small-basket-database  | 3306 | MySQL database (official image)      | `mysql:8.0`                                                                      |
| small-basket-backend   | 5000 | Express API for vegetables & checkout| `docker pull kesaripatil/small-basket-backend:latest`                            |
| small-basket-frontend  | 3000 | React UI for login, cart, checkout   | `docker pull kesaripatil/small-basket-frontend:latest`                           |
|------------------------|------|--------------------------------------|----------------------------------------------------------------------------------|

---
## 🔐 Database Credentials

These are configured in `db-secret.yaml`:

```env
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=vegshop
MYSQL_USER=veguser
MYSQL_PASSWORD=vegpass
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

- `deploy-on-k8s.sh` → Applies all manifests in sequence (including ingress controller add-on if not present):
  1. Namespace
  2. Secrets and Configmaps
  3. Database, Backend, Frontend Deployments
  4. Ingress
  5. Healthcheck ingress

- `cleanup-on-k8s.sh` → Deletes all manifests in reverse order for a clean teardown.

## Usage

### Run deployment:
```bash
./deploy-small-basket-on-k8s.sh
```

### Run cleanup:
```bash
./cleanup-small-basket-on-k8s.sh

```

### Local access:
1. Access over browser
`http://localhost:3000`

### Ingress access over AWS ALB
1. Grab the IP address for the AWS ALB. (Use nslookup <ALB DNS>)
2. Make entry in local /etc/hosts file
```
<ALB IP> dev.small-basket.com
```
3. Access over browser
`http://dev.small-basket.com`

---
## ⚠️ Disclaimer
This application was generated with the help of generative AI. The concept and execution flow are original ideas. Any similarity to other implementations is purely coincidental.

---
## Docker Hub Images:

- [Backend](https://hub.docker.com/r/kesaripatil/small-basket-backend)
- [Frontend](https://hub.docker.com/r/kesaripatil/small-basket-frontend)
- [Database](https://hub.docker.com/r/kesaripatil/small-basket-database)[Not used in above app]
