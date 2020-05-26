# line-lt-20200528

## command

```
gcloud init
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

```
deno run --allow-env --allow-net --allow-read main.ts
```

```
GCP_PROJECT=$(gcloud config list --format 'value(core.project)' 2>/dev/null)
SERVICE=line-deno
LINE_CHANNEL_SECRET=<your secret>
LINE_CHANNEL_ACCESS_TOKEN=<your access token>
gcloud builds submit --tag gcr.io/${GCP_PROJECT}/${SERVICE}
gcloud run deploy ${SERVICE} --image gcr.io/${GCP_PROJECT}/${SERVICE} --platform managed --allow-unauthenticated
gcloud run services update ${SERVICE} --set-env-vars LINE_CHANNEL_SECRET=${LINE_CHANNEL_SECRET},LINE_CHANNEL_ACCESS_TOKEN=${LINE_CHANNEL_ACCESS_TOKEN}
```
