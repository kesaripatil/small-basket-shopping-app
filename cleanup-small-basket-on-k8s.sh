#!/bin/bash
set -e
kubectl delete -f k8s-deployment-manifests/small-basket-healthz-ingress.yaml || true
kubectl delete -f k8s-deployment-manifests/small-basket-ingress.yaml || true
kubectl delete -f k8s-deployment-manifests/frontend-deployment.yaml || true
kubectl delete -f k8s-deployment-manifests/backend-deployment.yaml || true
kubectl delete -f k8s-deployment-manifests/database-deployment.yaml || true
kubectl delete -f k8s-deployment-manifests/db-secret.yaml || true
kubectl delete -f k8s-deployment-manifests/small-basket-namespace.yaml || true

