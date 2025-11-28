#!/bin/bash
set -e

# Create the ingress-nginx namespace
kubectl create namespace ingress-nginx
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.14.0/deploy/static/provider/cloud/deploy.yaml
kubectl -n ingress-nginx rollout status deploy/ingress-nginx-controller
kubectl -n ingress-nginx patch svc ingress-nginx-controller -p '{"spec":{"type":"NodePort","ports":[{"name":"http","port":80,"targetPort":80,"protocol":"TCP","nodePort":30080},{"name":"https","port":443,"targetPort":443,"protocol":"TCP","nodePort":30443}]}}'

