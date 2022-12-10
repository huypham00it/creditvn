#!/bin/bash

cp prod.dockerfile Dockerfile
gcloud config set project creditvn-prod
gcloud builds submit --tag gcr.io/creditvn-prod/creditvn-frontend
gcloud run deploy --image gcr.io/creditvn-prod/creditvn-frontend --platform managed