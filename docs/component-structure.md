# Component Structure

## Overview

This document outlines the component structure of the application, particularly focusing on the organization of video and dashboard components.

## Directory Structure

### App Components

All reusable UI components are organized under the `/app/components` directory with the following structure:

- `/app/components/ui/` - Basic UI components like buttons, cards, etc.
- `/app/components/videos/` - **General-purpose video components used across the entire application**
  - `VideoStatus.tsx` - Displays the status of a video processing job
  - `VideoUploader.tsx` - Component for uploading videos
  - `VideoList.tsx` - Displays a list of user's videos
  - `UploadSection.tsx` - Complete upload section with options
  - `types.ts` - Shared types for video components

### Dashboard Components

Dashboard-specific components are organized in a dedicated directory structure:

- `/app/components/dashboard/common/` - Shared dashboard components
  - `DashboardTabs.tsx` - Reusable tabs component for dashboard pages
- `/app/components/dashboard/videos/` - **Video management components specifically for the dashboard**
  - `VideosDashboardClient.tsx` - Client component for the videos dashboard page
  - `VideoGrid.tsx` - Grid view of videos in the dashboard
  - `DubbingJobsGrid.tsx` - Grid view of dubbing jobs
  - `types.ts` - Types specific to dashboard video components

## Component Responsibilities

### General Video Components (`/app/components/videos/`)
These components handle general video functionality like:
- Video uploading
- Video processing status display
- Video playback
- General video listings

### Dashboard Video Components (`/app/components/dashboard/videos/`)
These components handle dashboard-specific video management:
- Video management in the dashboard context
- Dubbing job management
- Dashboard-specific video displays
- Admin-focused video operations

## Import Conventions

When importing components, use the following pattern:

```typescript
// For general-purpose video components
import { VideoUploader } from '@/app/components/videos';

// For dashboard-specific components
import { VideosDashboardClient } from '@/app/components/dashboard/videos';
```

## Component Types

1. **Page Components** - Located in `/app/` directories, represent entire pages
2. **Feature Components** - Located in `/app/components/[feature]`, encapsulate feature-specific functionality
3. **UI Components** - Located in `/app/components/ui`, are building blocks used across the application

## Naming Conventions

- Use PascalCase for component files and component names
- Use consistent naming patterns (e.g., `VideoList.tsx`, `VideoUploader.tsx`)
- Group related components with common prefixes

## Future Improvements

As the application grows, consider:

1. Implementing atomic design principles
2. Adding storybook documentation for components
3. Creating more granular component tests
4. Merging duplicate types where appropriate 