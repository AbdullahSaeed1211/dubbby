# Dubbby - AI Video Dubbing Platform

Dubbby is an AI-powered video dubbing platform that enables creators to easily translate their videos into multiple languages with perfect lip synchronization.

## Key Features

- **AI-Powered Dubbing & Lip-Syncing**: Automatically translate videos into 15+ languages with perfectly synchronized lip movements
- **Fast Processing**: Get your dubbed videos in minutes, not days or weeks
- **Multilingual Support**: Support for over 15 languages with natural-sounding voices
- **Simple Upload Process**: Just upload your video, select your target languages, and let our AI do the rest
- **Voice Customization**: Choose from various voice styles and accents to match your brand
- **Batch Processing**: Process multiple videos at once for maximum efficiency

## Target Audience

- **Content Creators**: Expand your reach to global audiences with localized content
- **Marketing Agencies**: Create multilingual campaigns without the expense of multiple production teams
- **Businesses**: Reach international markets with localized product videos and advertisements
- **Educators**: Create educational content accessible to non-native speakers

## Project Structure

### Component Organization

```
/
├── app/                 # Next.js App Router structure
│   ├── api/             # API routes
│   ├── components/      # Application-specific shared components
│   │   └── video/       # Video-related components used across the app
│   ├── dashboard/       # Dashboard feature
│   └── video/           # Video processing feature
│
├── components/          # Reusable UI components 
│   ├── ui/              # Shadcn UI components
│   ├── providers/       # Context providers
│   └── magicui/         # Special UI components with animations
│
├── lib/                 # Shared utilities and services
│   ├── models/          # Mongoose models
│   └── utils/           # Helper functions
│
└── public/              # Static assets
```

### Component Guidelines

#### 1. Shadcn UI Components (`/components/ui/`)

All Shadcn UI components must be located directly under `/components/ui/`:

```tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
```

#### 2. Feature-Specific Components (`/app/{feature}/components/`)

Components that are only used within a specific feature should be placed in that feature's directory:

```tsx
import { DashboardStats } from "@/app/dashboard/components/DashboardStats";
```

#### 3. Shared App Components (`/app/components/`)

Components used across multiple features but specific to the application:

```tsx
import { VideoStatus } from "@/app/components/video/VideoStatus";
```

#### 4. Context Providers (`/components/providers/`)

Application-wide providers like theme or auth context:

```tsx
import { ThemeProvider } from "@/components/providers/theme-provider";
```

## Video Processing Flow

Our video processing pipeline follows these steps:

1. **Initial Upload Flow (Uploadcare → Cloudinary)**
   - User uploads video to Uploadcare (temporary storage)
   - Video is transferred to Cloudinary (permanent storage)

2. **Database Record Creation**
   - Create a processing record in MongoDB with status 'pending'

3. **Fal AI Integration**
   - Queue transformation with dynamic webhook URL
   - Submit to Fal AI for processing

4. **Webhook Handling**
   - Receive webhook callback from Fal AI
   - Upload transformed video to Cloudinary
   - Update database record with 'completed' status

5. **Error Handling**
   - Catch exceptions during processing
   - Update status to 'failed' with error details

### Database Schema

```typescript
interface VideoProcessing {
  userId: string;
  sourceVideoUrl: string;
  sourceVideoName: string;
  transformedVideoUrl?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  transformationParameters: TransformationParameters;
  processingStartedAt: Date;
  processingCompletedAt?: Date;
  error?: string;
}

interface TransformationParameters {
  prompt: string;
  target_language: string;
  do_lipsync: boolean;
  video_url: string;
}
```

### Required Environment Variables

```
MONGODB_URI=
NEXT_PUBLIC_APP_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY=
FAL_AI_API_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
```

### Video Requirements

- Format: MP4, MOV, AVI, WMV
- Max Size: 100MB
- Recommended Length: 5-15 seconds
- Optimal Resolution: 720p
- Aspect Ratio: 16:9 recommended

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Best Practices

- **File Storage**:
  - Use Uploadcare for initial upload (handles large files well)
  - Transfer to Cloudinary for permanent storage
  - Store both source and transformed videos in Cloudinary

- **Webhook Security**:
  - Validate webhook signatures
  - Use HTTPS endpoints
  - Include processing ID in webhook URL
  - Implement retry logic for uploads

- **User Experience**:
  - Show clear progress indicators during upload and processing
  - Provide estimated completion time when possible
  - Allow users to continue using the app while videos process
  - Send notifications when processing completes

## Technologies Used

- Next.js 14 App Router
- TypeScript
- Shadcn UI
- Clerk Auth
- Uploadcare
- Cloudinary
- Fal AI
- MongoDB
- Tailwind CSS

## Features

- Video upload with Uploadcare
- AI-powered video dubbing and lip sync using Fal AI
- Secure video storage with Cloudinary
- Real-time processing status updates
- User authentication with Clerk
- MongoDB for data persistence

## Prerequisites

- Node.js 18+ and npm
- MongoDB instance
- Clerk account for authentication
- Uploadcare account for video uploads
- Cloudinary account for video storage
- Fal AI API key for video processing

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dubbby.git
cd dubbby
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment variables file and fill in your values:
```bash
cp .env.example .env.local
```

4. Set up your environment variables in `.env.local`:
- Configure MongoDB connection string
- Add Clerk authentication keys
- Set up Uploadcare public key
- Configure Cloudinary credentials
- Add Fal AI API key and webhook secret

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Routes

- `POST /api/video/process` - Start video processing
- `GET /api/video/status` - Check processing status
- `POST /api/webhook/fal` - Handle Fal AI webhooks

## Environment Variables

See `.env.example` for all required environment variables.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel



The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
#   d u b b b y 
 
 
