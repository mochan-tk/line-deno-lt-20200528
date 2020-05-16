# line-lt-20200528

## command

```
gcloud init
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

```
deno run --allow-env --allow-net main.ts
```

```
GCP_PROJECT=$(gcloud config list --format 'value(core.project)' 2>/dev/null)
gcloud builds submit --tag gcr.io/$GCP_PROJECT/line-deno
gcloud run deploy line-deno --image gcr.io/$GCP_PROJECT/line-deno --platform managed --allow-unauthenticated
```