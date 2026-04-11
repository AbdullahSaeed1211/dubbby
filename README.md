# Dubbby

AI-powered video dubbing platform with lip synchronization. Translates videos into 15+ languages.

## Stack
Next.js 14, TypeScript, Shadcn UI, Clerk (auth), Uploadcare, Cloudinary, Fal AI, MongoDB, Tailwind CSS.

## Env Vars
MONGODB_URI, NEXT_PUBLIC_APP_URL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY, FAL_AI_API_KEY, CLERK_SECRET_KEY, NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

## Commands
npm install, npm run dev, npm run build

## Routes
POST /api/video/process, GET /api/video/status, POST /api/webhook/fal
