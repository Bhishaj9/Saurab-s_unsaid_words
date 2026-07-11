### Root Cause

The GitHub Pages deployment was failing due to a mismatch between the default branch in the repository and the branch specified in the GitHub Actions deployment workflow.

The repository uses the branch name `master`, but the `.github/workflows/deploy.yml` file is configured to trigger on the `main` branch.

Because the workflow never triggered, GitHub Pages fell back to its default behavior of serving the raw source repository from the `master` branch. The raw `index.html` references an uncompiled TypeScript file (`/src/main.tsx`). This resulted in a blank screen for two reasons:
1. The absolute path `/src/main.tsx` evaluates to `https://bhishaj9.github.io/src/main.tsx`, which bypasses the repository subpath (`/Saurab-s_unsaid_words/`), returning a 404.
2. Even if the path were correct, browsers cannot directly execute TypeScript modules natively.

### Why it works locally but fails on GitHub Pages

Locally, `npm run dev` starts the Vite development server. Vite intercepts the `<script type="module" src="/src/main.tsx"></script>` tag and transpiles the TypeScript file on the fly into JavaScript that the browser can understand.

In production, Vite outputs standard HTML/CSS/JS into the `dist` folder. However, because the GitHub Action workflow never ran, the `dist` folder was never generated and uploaded to GitHub Pages.

### Exact file responsible

`.github/workflows/deploy.yml`

### Exact Fix

Change the branch name in the `deploy.yml` file from `main` to `master`.

### Code changes required

```diff
--- a/.github/workflows/deploy.yml
+++ b/.github/workflows/deploy.yml
@@ -2,7 +2,7 @@ name: Deploy to GitHub Pages

 on:
   push:
-    branches: [main]
+    branches: [master]
   workflow_dispatch:
```

### Verification steps

1. Commit and push the updated `.github/workflows/deploy.yml` file to the `master` branch.
2. Go to the "Actions" tab in the GitHub repository.
3. Verify that the "Deploy to GitHub Pages" workflow is triggered and completes successfully.
4. Once the workflow is finished, visit the target URL (`https://bhishaj9.github.io/Saurab-s_unsaid_words/`) and verify that the application renders correctly.

### Confirmation

By applying this change, the GitHub Action will successfully build the production application using Vite and deploy the generated `dist` folder to GitHub Pages. The `dist/index.html` properly references the compiled JavaScript and CSS assets, ensuring the application will work as intended after redeployment.
