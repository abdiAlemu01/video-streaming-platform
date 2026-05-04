# 🚀 Render Deployment Guide - Netflix Stream Video

Complete step-by-step guide to deploy your Netflix Stream Video React application on Render.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Prepare Your Project](#prepare-your-project)
3. [Render Dashboard Setup](#render-dashboard-setup)
4. [Environment Variables](#environment-variables)
5. [Build Configuration](#build-configuration)
6. [Deployment Process](#deployment-process)
7. [Custom Domain Setup](#custom-domain-setup)
8. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

Before deploying to Render, ensure you have:

- [ ] GitHub account with your project repository
- [ ] Render account (sign up at [render.com](https://render.com))
- [ ] TMDB API key
- [ ] Project pushed to GitHub
- [ ] All dependencies listed in `package.json`

---

## 📦 Prepare Your Project

### 1. Update package.json

Ensure your `package.json` has the correct build scripts:

```json
{
  "name": "netflix-clone",
  "version": "0.1.0",
  "private": true,
  "homepage": ".",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

### 2. Create a Build Configuration File

Create a file named `render.yaml` in your project root (optional but recommended):

```yaml
services:
  - type: web
    name: netflix-stream-video
    env: static
    buildCommand: cd Netflix-Clone && npm install && npm run build
    staticPublishPath: Netflix-Clone/build
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

### 3. Update Environment Variables

Make sure your `.env` file is NOT committed to GitHub. Instead, you'll add these as environment variables in Render.

**Important**: Add `.env` to your `.gitignore`:

```
# .gitignore
.env
.env.local
.env.production
```

### 4. Update Router Configuration

Ensure your `index.js` uses `BrowserRouter` correctly:

```javascript
import { BrowserRouter } from 'react-router-dom';

root.render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

### 5. Push to GitHub

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

---

## 🎛️ Render Dashboard Setup

### Step 1: Sign Up / Log In to Render

1. Go to [render.com](https://render.com)
2. Click **"Get Started"** or **"Sign In"**
3. Sign up with GitHub (recommended for easy integration)

### Step 2: Create a New Static Site

1. Click **"New +"** button in the top right
2. Select **"Static Site"**

### Step 3: Connect Your Repository

1. **Connect GitHub Account**:
   - Click **"Connect GitHub"**
   - Authorize Render to access your repositories
   - Select your Netflix Stream Video repository

2. **Repository Selection**:
   - Search for your repository name
   - Click **"Connect"**

### Step 4: Configure Your Static Site

Fill in the following details:

#### Basic Information

| Field | Value |
|-------|-------|
| **Name** | `netflix-stream-video` (or your preferred name) |
| **Branch** | `main` (or your default branch) |
| **Root Directory** | `Netflix-Clone` |

#### Build Settings

| Field | Value |
|-------|-------|
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `build` |

#### Advanced Settings (Click "Advanced")

| Field | Value |
|-------|-------|
| **Auto-Deploy** | `Yes` (Enable automatic deployments) |
| **Pull Request Previews** | `Yes` (Optional - for testing PRs) |

---

## 🔐 Environment Variables

### Step 1: Add Environment Variables

In the Render dashboard, scroll to **"Environment Variables"** section:

1. Click **"Add Environment Variable"**
2. Add the following variables:

| Key | Value | Description |
|-----|-------|-------------|
| `REACT_APP_API_KEY` | `your_tmdb_api_key` | Your TMDB API key |
| `NODE_VERSION` | `18.17.0` | Node.js version (optional) |
| `NPM_VERSION` | `9.6.7` | npm version (optional) |

### Step 2: Verify Environment Variables

Make sure:
- ✅ All variable names start with `REACT_APP_` (for React apps)
- ✅ No quotes around values
- ✅ No spaces in variable names
- ✅ API key is correct and active

---

## ⚙️ Build Configuration

### Option 1: Using Render Dashboard (Recommended)

**Build Command**:
```bash
npm install && npm run build
```

**Publish Directory**:
```
build
```

**Root Directory**:
```
Netflix-Clone
```

### Option 2: Using render.yaml File

Create `render.yaml` in your project root:

```yaml
services:
  - type: web
    name: netflix-stream-video
    env: static
    buildCommand: cd Netflix-Clone && npm install && npm run build
    staticPublishPath: Netflix-Clone/build
    envVars:
      - key: REACT_APP_API_KEY
        sync: false
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

### Routing Configuration

For React Router to work properly, add rewrite rules:

**In Render Dashboard**:
1. Go to **"Redirects/Rewrites"** section
2. Add a rewrite rule:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Type**: `Rewrite`

---

## 🚀 Deployment Process

### Step 1: Create the Static Site

1. Review all settings
2. Click **"Create Static Site"**
3. Render will start building your application

### Step 2: Monitor the Build

1. You'll see the build logs in real-time
2. Wait for the build to complete (usually 2-5 minutes)
3. Look for **"Build successful"** message

### Step 3: Access Your Deployed Site

Once deployed, you'll get a URL like:
```
https://netflix-stream-video.onrender.com
```

---

## 🌐 Custom Domain Setup (Optional)

### Step 1: Add Custom Domain

1. In your Render dashboard, go to your static site
2. Click **"Settings"** tab
3. Scroll to **"Custom Domains"**
4. Click **"Add Custom Domain"**

### Step 2: Configure DNS

Add these DNS records to your domain provider:

**For Root Domain (example.com)**:
```
Type: A
Name: @
Value: 216.24.57.1
```

**For Subdomain (www.example.com)**:
```
Type: CNAME
Name: www
Value: netflix-stream-video.onrender.com
```

### Step 3: Verify Domain

1. Wait for DNS propagation (can take up to 48 hours)
2. Render will automatically provision SSL certificate
3. Your site will be accessible via your custom domain

---

## 🔧 Advanced Configuration

### Enable HTTPS Redirect

In Render dashboard:
1. Go to **"Settings"**
2. Enable **"HTTPS Redirect"**
3. All HTTP traffic will redirect to HTTPS

### Configure Headers

Add custom headers for security:

1. Go to **"Headers"** section
2. Add the following headers:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### Set Up Pull Request Previews

1. Go to **"Settings"**
2. Enable **"Pull Request Previews"**
3. Each PR will get a unique preview URL

---

## 🐛 Troubleshooting

### Build Fails

**Problem**: Build command fails

**Solutions**:
1. Check Node.js version compatibility
2. Verify all dependencies are in `package.json`
3. Check build logs for specific errors
4. Try building locally first: `npm run build`

**Common Fixes**:
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Not Working

**Problem**: API calls fail or return errors

**Solutions**:
1. Verify variable names start with `REACT_APP_`
2. Check for typos in variable names
3. Ensure no quotes around values
4. Rebuild after adding variables

### Routing Issues (404 on Refresh)

**Problem**: Page refreshes result in 404 errors

**Solution**: Add rewrite rule in Render:
```
Source: /*
Destination: /index.html
Type: Rewrite
```

### Blank Page After Deployment

**Problem**: Site loads but shows blank page

**Solutions**:
1. Check browser console for errors
2. Verify `homepage` in `package.json` is set to `"."`
3. Check if all assets are loading correctly
4. Verify API key is working

### Build Takes Too Long

**Problem**: Build process exceeds time limit

**Solutions**:
1. Optimize dependencies
2. Remove unused packages
3. Use `npm ci` instead of `npm install`
4. Enable build caching

---

## 📊 Monitoring & Maintenance

### Check Deployment Status

1. Go to Render dashboard
2. Click on your static site
3. View **"Events"** tab for deployment history

### View Logs

1. Click **"Logs"** tab
2. View real-time build and deployment logs
3. Filter by date or search for specific errors

### Update Deployment

**Automatic Updates**:
- Push to GitHub → Render auto-deploys

**Manual Deploy**:
1. Go to your static site dashboard
2. Click **"Manual Deploy"**
3. Select **"Deploy latest commit"**

### Rollback Deployment

1. Go to **"Events"** tab
2. Find previous successful deployment
3. Click **"Rollback to this deploy"**

---

## 💰 Pricing Information

### Free Tier Includes:
- ✅ 100 GB bandwidth/month
- ✅ Automatic SSL certificates
- ✅ Global CDN
- ✅ Unlimited static sites
- ✅ Pull request previews

### Paid Plans:
- **Starter**: $7/month - 100 GB bandwidth
- **Pro**: Custom pricing for higher traffic

---

## 📝 Deployment Checklist

Before deploying, ensure:

- [ ] All code is pushed to GitHub
- [ ] `.env` is in `.gitignore`
- [ ] `package.json` has correct scripts
- [ ] Build works locally (`npm run build`)
- [ ] TMDB API key is ready
- [ ] Router is configured correctly
- [ ] All dependencies are listed
- [ ] No hardcoded API keys in code

---

## 🎯 Quick Deploy Commands

### Initial Setup
```bash
# 1. Prepare project
cd Netflix-Clone
npm install
npm run build

# 2. Test build locally
npx serve -s build

# 3. Commit and push
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### Update Deployment
```bash
# Make changes
git add .
git commit -m "Update: description of changes"
git push origin main
# Render will auto-deploy
```

---

## 🔗 Useful Links

- [Render Documentation](https://render.com/docs)
- [Render Status Page](https://status.render.com/)
- [Render Community Forum](https://community.render.com/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)

---

## 📞 Support

If you encounter issues:

1. Check [Render Status Page](https://status.render.com/)
2. Review [Render Docs](https://render.com/docs)
3. Ask in [Render Community](https://community.render.com/)
4. Contact Render Support (for paid plans)

---

## ✅ Post-Deployment Verification

After deployment, verify:

1. **Homepage loads correctly**
   - Visit your Render URL
   - Check if all content displays

2. **Navigation works**
   - Test all menu items
   - Verify routing works

3. **Search functionality**
   - Try searching for movies/shows
   - Verify results display

4. **API integration**
   - Check if content loads from TMDB
   - Verify images display

5. **Responsive design**
   - Test on mobile devices
   - Check tablet view
   - Verify desktop layout

6. **Performance**
   - Run Lighthouse audit
   - Check load times
   - Verify Core Web Vitals

---

**Congratulations! 🎉**

Your Netflix Stream Video application is now live on Render!

Share your deployed URL and enjoy your streaming platform! 🍿

---

*Last Updated: 2025*
*For the latest Render features, check their official documentation.*
