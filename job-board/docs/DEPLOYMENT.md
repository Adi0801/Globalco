# Deployment

## GitHub Repository

Initialize Git, commit the project, and push it to a GitHub repository.

```bash
git init
git add .
git commit -m "Build enterprise job board"
git branch -M main
git remote add origin <repository-url>
git push -u origin main
```

## GitHub Actions

The workflow at `.github/workflows/ci-cd.yml` runs on pull requests and pushes to `main`.

It performs:

- `npm ci`
- `npm run lint`
- `npm run build`
- Vercel production deployment on `main`

## Vercel Setup

Create a Vercel project connected to this repository or import it through the Vercel dashboard.

Use these settings:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm ci`

## Required GitHub Secrets

Add these secrets in GitHub repository settings:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

The workflow uses these secrets with Vercel CLI to pull project settings, build, and deploy the prebuilt output.

## Final Submission

Submit:

- GitHub repository URL
- Vercel deployment URL
- Documentation URL or the repository docs folder
