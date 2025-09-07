# Inoa Services – Next.js 14 Landing Page

Vercel-ready landing page with Tailwind CSS, inline SVG logo, and a serverless contact form using Nodemailer.

## Quick Start (Windows PowerShell)

```powershell
cd "c:\Users\eduar\OneDrive\Desktop\Inoa Services Platform\inoa-landing"
npm install
npm run dev
```

Open http://localhost:3000

### Environment Variables
Create `.env.local`:

```
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

Use a Gmail App Password (2FA required). Add the same variables in Vercel Project Settings → Environment Variables.

### Deploy
- Push to Git and import the repo in Vercel
- Set env vars in Vercel and deploy

### Notes
- The header uses an inline SVG that matches your brand colors.
- Update services and copy as your business grows.
