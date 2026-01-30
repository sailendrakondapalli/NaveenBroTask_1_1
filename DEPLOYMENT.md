# Deployment Guide for Render

## 🚀 Quick Deploy to Render

### Option 1: Automatic Deployment (Recommended)

1. **Connect Repository to Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Static Site"
   - Connect your GitHub account
   - Select the repository: `sailendrakondapalli/NaveenBroTask_1_1`

2. **Configure Build Settings**
   - Render will automatically detect the `render.yaml` configuration
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   - Environment: `Static Site`

3. **Deploy**
   - Click "Create Static Site"
   - Render will automatically build and deploy your application
   - Your app will be available at: `https://your-app-name.onrender.com`

### Option 2: Manual Configuration

If automatic detection doesn't work:

1. **Create New Static Site**
   - Repository: `https://github.com/sailendrakondapalli/NaveenBroTask_1_1.git`
   - Branch: `main`

2. **Build Settings**
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`

3. **Environment Variables** (if needed)
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## 📋 Pre-deployment Checklist

- ✅ Repository pushed to GitHub
- ✅ `dist` folder included in repository
- ✅ `render.yaml` configuration file present
- ✅ Build command tested locally (`npm run build`)
- ✅ Environment variables configured (if using Supabase)

## 🔧 Troubleshooting

### Build Fails
- Check that Node.js version is compatible (v16+)
- Verify all dependencies are in `package.json`
- Run `npm install && npm run build` locally to test

### App Doesn't Load
- Check that `dist` folder contains `index.html`
- Verify routing configuration for SPA
- Check browser console for errors

### Environment Variables
- Ensure all `VITE_` prefixed variables are set in Render dashboard
- Variables should match those in your local `.env` file

## 🌐 Custom Domain (Optional)

1. In Render dashboard, go to your site settings
2. Click "Custom Domains"
3. Add your domain name
4. Update DNS records as instructed by Render

## 📊 Monitoring

- Check deployment logs in Render dashboard
- Monitor build times and success rates
- Set up notifications for failed deployments

## 🔄 Auto-Deploy

Render automatically deploys when you push to the `main` branch. To disable:
1. Go to site settings
2. Turn off "Auto-Deploy"

---

Your application is now ready for production! 🎉