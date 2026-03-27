# AWS Amplify deployment guide

This project is a Next.js app with a static shadcn registry available under `public/r/*`.
Amplify Hosting supports Next.js SSR apps, so this setup deploys both your website and registry JSON from one app.

## 1) Prerequisites

- Code is pushed to GitHub/GitLab/Bitbucket.
- AWS account with access to Amplify Hosting.
- A domain name (optional but recommended).

## 2) Files added for Amplify

- `amplify.yml` - build instructions for pnpm + Next.js.
- `.env.example` - required public env variable example.

## 3) Create Amplify app

1. Open AWS Console -> Amplify -> **Create new app** -> **Host web app**.
2. Connect your Git provider and select this repository.
3. Choose the branch (example: `main`).
4. Amplify should detect `amplify.yml` automatically.
5. Click **Next**.

## 4) Configure environment variables

In Amplify app settings (or during create flow), add:

- `NEXT_PUBLIC_DOCUMENTATION_ENDPOINT` = your documentation API URL, for example:
  `https://docs-api.yourdomain.com/api/document`

Notes:
- `NEXT_PUBLIC_*` variables are exposed to browser code.
- Do not put secrets in `NEXT_PUBLIC_*` variables.

## 5) Deploy

1. Click **Save and deploy**.
2. Wait for build + deploy to complete.
3. Open the generated Amplify URL and verify:
   - Home page loads.
   - Registry endpoints are reachable:
     - `/r/registry.json`
     - `/r/documentation-provider.json`

## 6) Add custom domain (optional)

1. In Amplify app -> **Domain management** -> **Add domain**.
2. Select your Route53 domain (or configure DNS records if external DNS).
3. Map branch (example: `main` -> `www.yourdomain.com`).
4. Wait for SSL certificate validation and deployment.

## 7) Continuous deployment

- Every push to the connected branch triggers a new Amplify build/deploy.
- For staging/prod, use separate branches (example: `develop`, `main`).

## 8) Local verification before pushing

```bash
pnpm install
pnpm run build
pnpm run start
```

Then visit:
- `http://localhost:3006/`
- `http://localhost:3006/r/registry.json`

## Troubleshooting

- Build fails on dependencies:
  - Ensure `pnpm-lock.yaml` is committed.
  - Keep `amplify.yml` using `corepack enable` + `pnpm install --frozen-lockfile`.
- Documentation drawer fails:
  - Confirm `NEXT_PUBLIC_DOCUMENTATION_ENDPOINT` is set correctly in Amplify.
  - Check browser network tab for CORS/API errors from docs backend.
