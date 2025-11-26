#!/bin/bash
set -e

echo "🚀 Deploying Small Basket to Kubernetes..."

# Step 1: Namespace
kubectl apply -f k8s-deployment-manifests/small-basket-namespace.yaml

# Step 2: Secrets
kubectl apply -f k8s-deployment-manifests/db-secret.yaml

# Step 3: Deployments (database, backend, frontend)
kubectl apply -f k8s-deployment-manifests/database-deployment.yaml
kubectl apply -f k8s-deployment-manifests/backend-deployment.yaml
kubectl apply -f k8s-deployment-manifests/frontend-deployment.yaml

# Step 4: Ingress
kubectl apply -f k8s-deployment-manifests/small-basket-ingress.yaml

# Step 5: Healthcheck ingress (optional)
kubectl apply -f k8s-deployment-manifests/small-basket-healthz-ingress.yaml

echo "✅ All manifests applied. Checking pods status..."
kubectl get pods -n small-basket

