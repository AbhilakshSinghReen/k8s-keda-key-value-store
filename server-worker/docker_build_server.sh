#!/bin/bash

ln -fs .dockerignore.server .dockerignore

docker build -f Dockerfile.server -t abhilakshsinghreen/k8s-key-value-store-server .