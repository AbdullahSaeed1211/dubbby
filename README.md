# Dubbby

AI-powered video dubbing platform with lip synchronization. Translates videos into 15+ languages.

## What It Does
- User uploads video (Uploadcare → Cloudinary transfer)
- Selects target language and lip-sync option
- Fal AI processes the video with dynamic webhook
- Webhook receives result → uploads to Cloudinary → updates DB record
- Dashboard shows processing status per video

## Stack
Next.js 14 (App Router), TypeScript, Shadcn UI, Clerk (auth), Uploadcare, Cloudinary, Fal AI, MongoDB, Tailwind CSS.

## Video Processing Flow
1. Upload to Uploadcare (temp storage)
2. Transfer to Cloudinary (permanent storage)
3. Create MongoDB record with `status: pending`
4. Queue Fal AI transformation with webhook URL
5. Webhook callback → upload result to Cloudinary → `status: completed`
6. Error → `status: failed` with error message

## Env Vars
```
MONGODB_URI
NEXT_PUBLIC_APP_URL
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY
FAL_AI_API_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
```

## Video Requirements
- Format: MP4, MOV, AVI, WMV
- Max size: 100MB
- Recommended length: 5–15 seconds
- Optimal resolution: 720p

## Commands
```
npm install
npm run dev
npm run build
npm start
```
