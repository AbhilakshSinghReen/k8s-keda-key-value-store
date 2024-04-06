#!/bin/bash

ln -fs .dockerignore.worker .dockerignore

docker build -f Dockerfile.worker -t abhilakshsinghreen/k8s-key-value-store-worker .