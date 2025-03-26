# Hooks Structure

## Overview

This document outlines the hooks used in the application, particularly focusing on naming conventions and available functionality.

## Directory Structure

All custom React hooks are organized in the `/hooks` directory with the following structure:

- `/hooks/use-*.ts` - General-purpose React hooks

## Naming Convention

We follow a consistent naming convention using kebab-case for hook file names and camelCase for the actual hook functions:

```typescript
// File: hooks/use-example.ts
export function useExample() {
  // Hook implementation
}
```

## Available Hooks

### `use-dubbing.ts`

The dubbing hook provides functionality for working with the video dubbing system.

```typescript
const {
  jobs,                // Array of dubbing jobs
  isLoading,           // Loading state
  error,               // Error state
  submitJob,           // Submit a new dubbing job
  uploadAndDub,        // Upload and dub in one operation
  pollJobStatus,       // Poll for job status updates
  cancelPolling,       // Cancel polling for a job
  submitDubbingJob,    // Legacy submission method
  isSubmitting         // Legacy loading state
} = useDubbing();
```

#### Usage Examples

```typescript
// Submit a new dubbing job
const jobId = await submitJob(videoUrl, 'english');

// Upload a file and submit it for dubbing
await uploadAndDub(fileObject, 'spanish');

// Poll for status updates
pollJobStatus(jobId);

// Cancel polling when no longer needed
cancelPolling(jobId);
```

### `use-mobile.ts`

Hook for detecting mobile devices and handling responsive behavior.

```typescript
const isMobile = useMobile();
```

## Best Practices

1. Hooks should be focused on a single concern
2. Use kebab-case for file names and camelCase for hook functions
3. Include appropriate TypeScript interfaces for parameters and return values
4. Document hook purpose and usage
5. Test hooks with React Testing Library 