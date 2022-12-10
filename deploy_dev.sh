#!/bin/bash

cp dev.dockerfile Dockerfile
gcloud config set project creditvn-dev
gcloud builds submit --tag gcr.io/creditvn-dev/creditvn-web-app
gcloud run deploy --image gcr.io/creditvn-dev/creditvn-web-app --platform managed