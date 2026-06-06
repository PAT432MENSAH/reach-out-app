# Deploy REACH OUT to Vercel

A step-by-step guide to deploy your REACH OUT learning platform to Vercel (free hosting).

## Prerequisites

✅ GitHub account (free at [github.com](https://github.com))  
✅ Vercel account (free at [vercel.com](https://vercel.com))  
✅ Git installed on your computer

## Step 1: Initialize Git Locally

In your project folder (`Ghana need you ( Reach Out APP)`), run these commands in terminal/PowerShell:

```powershell
git init
git add .
git commit -m "Initial commit: REACH OUT learning platform"
```

## Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com) → Sign in
2. Click **+** icon (top right) → **New repository**
3. Name it: `reach-out-app`
4. Add description: "Communication mastery learning platform"
5. Choose **Public** (for free deployment)
6. Click **Create repository**

## Step 3: Push to GitHub

Copy the commands GitHub shows you and run them locally:

```powershell
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/reach-out-app.git
git push -u origin main
```

*(Replace YOUR_USERNAME with your actual GitHub username)*

## Step 4: Deploy to Vercel

### Option A: Web Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
2. Click **Add New** → **Project**
3. Select your `reach-out-app` repository
4. Keep default settings (no build command needed)
5. Click **Deploy** → Wait 1-2 minutes

### Option B: Vercel CLI

```powershell
npm install -g vercel
vercel login
vercel
```

Follow the prompts and your site will be live!

## Step 5: Your Live URL

After deployment, Vercel gives you:
- **Production URL**: `reach-out-app.vercel.app` (or custom domain)
- **Staging URLs**: Auto-created for each branch

## Updating Your Site

Every time you push changes to GitHub:

```powershell
git add .
git commit -m "Update: add new feature"
git push
```

Vercel automatically redeploys (usually within 30 seconds)!

## Custom Domain (Optional)

1. In Vercel dashboard → Your project
2. Go to **Settings** → **Domains**
3. Add your custom domain (e.g., `reachoutapp.com`)
4. Follow DNS instructions

## Troubleshooting

**"Build failed"**
- This is a static site - no build needed
- Check vercel.json is in root folder

**"Blank page on deployment"**
- Ensure all HTML/CSS/JS files are in root folder
- Check file paths (use relative paths like `./styles.css`)

**"403 Error"**
- Repository must be Public on GitHub
- Check Vercel has GitHub permissions

## Features After Deployment

✅ Auto HTTPS (SSL certificate)  
✅ Global CDN (fast loading worldwide)  
✅ Preview URLs for each branch  
✅ Automatic deployments on git push  
✅ Free tier: unlimited projects & bandwidth  

## Environment Variables (if needed later)

In Vercel dashboard → **Settings** → **Environment Variables**:
- Add any API keys (if you add a backend later)
- Automatically injected at build/runtime

## Performance

Your site will be:
- **Fast**: Global CDN edge locations
- **Secure**: Automatic HTTPS/SSL
- **Scalable**: Auto-scales with traffic
- **Reliable**: 99.95% uptime SLA

## Rollback

If something breaks, go to **Deployments** and click previous version to revert instantly.

## Cost

**Free tier includes:**
- Unlimited projects
- Unlimited bandwidth
- Automatic SSL
- Preview deployments
- Team collaboration (up to 5 members)

## Next Steps

1. Push code to GitHub
2. Connect to Vercel
3. Share live link with users!

---

**Need help?**
- [Vercel Docs](https://vercel.com/docs)
- [GitHub Help](https://docs.github.com)
- Contact Vercel Support (free tier gets email support)
