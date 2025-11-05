# 🚀 InstaGem Deployment Guide

## Pre-Deployment Checklist ✅

- [x] Backend code ready in `/server` folder
- [x] Frontend code ready with Vite + React
- [x] MongoDB Atlas configured
- [x] Cloudinary configured
- [ ] Repository is public
- [ ] Render account created
- [ ] Vercel account created

---

## 📦 Environment Variables Reference

### Backend (Render) - You'll need these:

```
NODE_ENV=production
PORT=5001
MONGO_URI=mongodb+srv://instagem_user:nBC5y1cdegQLiu2w@cluster0.k2atslp.mongodb.net/instagem?appName=Cluster0
JWT_SECRET=instagem_secret_key_2025
CLOUDINARY_CLOUD_NAME=dnvrprtu9
CLOUDINARY_API_KEY=574886333384957
CLOUDINARY_API_SECRET=EknoarhHMjTwq6VqwrU6KdDU0GI
CLIENT_URL=https://your-vercel-app.vercel.app
```

**Note:** Update `CLIENT_URL` after you deploy frontend to Vercel!

### Frontend (Vercel) - You'll need this:

```
VITE_API_URL=https://your-render-app.onrender.com
```

**Note:** Update after you deploy backend to Render!

---

## 🔧 Part 1: Deploy Backend to Render

### Step 1: Sign Up
1. Go to https://render.com
2. Click "Get Started" or "Sign Up"
3. Choose "Sign in with GitHub"
4. Authorize Render to access your GitHub

### Step 2: Create Web Service
1. Click "New +" button (top right)
2. Select "Web Service"
3. Click "Connect account" if needed
4. Find and select **swostitech-solutions/InstaGem**
5. Click "Connect"

### Step 3: Configure Service
Fill in these settings:

**Name:** `instagem-backend` (or any name you like)

**Region:** Choose closest to you (e.g., Oregon, Singapore)

**Branch:** `main`

**Root Directory:** `server`

**Runtime:** `Node`

**Build Command:**
```bash
npm install
```

**Start Command:**
```bash
npm start
```

**Instance Type:** `Free`

### Step 4: Add Environment Variables
Click "Advanced" and add these environment variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5001` |
| `MONGO_URI` | `mongodb+srv://instagem_user:nBC5y1cdegQLiu2w@cluster0.k2atslp.mongodb.net/instagem?appName=Cluster0` |
| `JWT_SECRET` | `instagem_secret_key_2025` |
| `CLOUDINARY_CLOUD_NAME` | `dnvrprtu9` |
| `CLOUDINARY_API_KEY` | `574886333384957` |
| `CLOUDINARY_API_SECRET` | `EknoarhHMjTwq6VqwrU6KdDU0GI` |
| `CLIENT_URL` | `*` (change to Vercel URL later) |

### Step 5: Deploy
1. Click "Create Web Service"
2. Wait 5-10 minutes for build and deployment
3. Once deployed, you'll get a URL like: `https://instagem-backend.onrender.com`
4. Test it by visiting: `https://YOUR-URL.onrender.com/` (should see API message)

**⚠️ IMPORTANT:** Copy your Render URL! You'll need it for Vercel.

---

## 🎨 Part 2: Deploy Frontend to Vercel

### Step 1: Sign Up
1. Go to https://vercel.com
2. Click "Sign Up" or "Log In"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub

### Step 2: Import Project
1. Click "Add New..." → "Project"
2. Click "Import Git Repository"
3. Find **swostitech-solutions/InstaGem**
4. Click "Import"

### Step 3: Configure Project
Fill in these settings:

**Framework Preset:** `Vite`

**Root Directory:** `./` (leave as root)

**Build Command:**
```bash
npm run build
```

**Output Directory:**
```bash
dist
```

**Install Command:**
```bash
npm install
```

### Step 4: Add Environment Variable
Click "Environment Variables" and add:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://YOUR-RENDER-URL.onrender.com` |

**Replace with your actual Render backend URL!**

### Step 5: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes for build
3. Once deployed, you'll get a URL like: `https://instagem.vercel.app`

---

## 🔄 Part 3: Update CORS (Important!)

After both are deployed, update the backend CORS:

### Option A: Via Render Dashboard
1. Go to your Render service
2. Click "Environment"
3. Update `CLIENT_URL` to your Vercel URL: `https://instagem.vercel.app`
4. Save changes
5. Render will automatically redeploy

### Option B: Update Code and Push
1. Update `server/.env` with your Vercel URL
2. Commit and push to GitHub
3. Render will auto-deploy

---

## ✅ Part 4: Testing

### Test Backend:
Visit: `https://YOUR-RENDER-URL.onrender.com/`
Should see:
```json
{
  "success": true,
  "message": "InstaGem API is running 🚀",
  "version": "1.0.0"
}
```

### Test Frontend:
1. Visit: `https://YOUR-VERCEL-URL.vercel.app/`
2. Try signing up with:
   - Kid's name
   - Age (1-17)
   - Parent email
   - Username
   - Email
   - Password
   - Favorite color
3. Try logging in
4. Check if videos load in the feed
5. Try liking and commenting on videos

---

## 🐛 Troubleshooting

### Backend Issues:

**"Application failed to respond"**
- Check logs in Render dashboard
- Verify environment variables are correct
- Make sure MongoDB URI is correct

**CORS errors**
- Update `CLIENT_URL` to match your Vercel URL
- Don't use `localhost` in production

### Frontend Issues:

**"Network Error" when signing up/logging in**
- Check if `VITE_API_URL` is set correctly
- Make sure backend is running
- Check browser console for errors

**Videos not loading**
- Videos are local educational content, should work offline
- Check browser console for errors

---

## 📝 Post-Deployment Checklist

- [ ] Backend deployed and responding
- [ ] Frontend deployed and loading
- [ ] CORS updated with Vercel URL
- [ ] Signup/registration working
- [ ] Login working
- [ ] Videos loading and playing
- [ ] Like functionality working
- [ ] Comment functionality working
- [ ] Mobile responsive (test on phone)

---

## 🎉 Success!

If all tests pass, your InstaGem educational platform is **LIVE**! 🚀

**Share the URL with your boss and team!**

---

## 📞 Need Help?

Common issues and solutions:
1. **Render free tier sleeps after 15 min** - First request will be slow
2. **MongoDB connection fails** - Check if IP whitelist allows all IPs (0.0.0.0/0)
3. **Vercel build fails** - Check if `vite.config.ts` is correct
4. **API not connecting** - Verify `VITE_API_URL` in Vercel dashboard

---

## 🔐 Security Notes

**After deployment:**
1. Consider rotating JWT_SECRET
2. Don't commit `.env` files to GitHub
3. Monitor MongoDB Atlas for unusual activity
4. Keep Cloudinary usage within free tier limits

---

**Good luck with the deployment! 🚀**
