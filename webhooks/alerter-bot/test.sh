#!/bin/bash

# Define the URL
url="http://localhost:5000/webhooks/max-workers-reached?scaler=KEDA&namespace=keda&deployment=api-worker&numWorkers=5"

# Make the POST request using curl
curl -X POST "$url"