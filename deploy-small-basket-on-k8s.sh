#!/bin/bash
set -e

echo "Checking ingress-nginx controller..."
if ! kubectl get ns ingress-nginx >/dev/null 2>&1; then
  echo "Ingress controller not found. Installing..."
  ./install-ingress-controller-add-on.sh
else
  echo "Ingress controller already installed."
fi

echo "🚀 Deploying Small Basket to Kubernetes..."

# Step 1: Namespace
kubectl apply -f k8s-deployment-manifests/small-basket-namespace.yaml

# Step 2: Secrets and configmaps
kubectl apply -f k8s-deployment-manifests/db-secret.yaml
kubectl apply -f k8s-deployment-manifests/vegdb-mysql-init-configmap.yaml
kubectl apply -f k8s-deployment-manifests/frontend-config.yaml

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

