# Dubbby Waitlist Setup Guide

This guide explains how to set up and manage the waitlist feature for Dubbby.

## Prerequisites

1. A Clerk account (sign up at https://clerk.com if you don't have one)
2. Your Clerk API keys from the Clerk Dashboard

## Environment Setup

1. Create a `.env` file in the project root with the following content:

```
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
CLERK_SECRET_KEY=your_secret_key_here

# Auth Redirects
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
```

2. Replace `your_publishable_key_here` and `your_secret_key_here` with your actual Clerk API keys from the [Clerk Dashboard](https://dashboard.clerk.com/last-active?path=api-keys).

## Enable Waitlist Mode

1. In the Clerk Dashboard, navigate to the [**Restrictions**](https://dashboard.clerk.com/last-active?path=user-authentication/restrictions) page.
2. Under the **Sign-up modes** section, enable **Waitlist**.

## Managing Users on the Waitlist

1. In the Clerk Dashboard, navigate to the [**Waitlist**](https://dashboard.clerk.com/last-active?path=waitlist) page.
2. On the right-side of a user's row, select the menu icon (...).
3. Select **Invite** to invite the user to your application. 
4. Select **Deny** to deny the user access to your application.

## Project Structure

The waitlist implementation consists of the following files:

- `app/waitlist/[[...waitlist]]/page.tsx`: The waitlist page with the Clerk Waitlist component
- `app/sign-in/[[...sign-in]]/page.tsx`: The sign-in page for approved users
- `middleware.ts`: Next.js middleware for authentication and route protection
- `app/layout.tsx`: Root layout with the ClerkProvider configured for waitlist

## Running the Application

1. Install dependencies: `npm install`
2. Run the development server: `npm run dev`
3. Open your browser and navigate to `http://localhost:3000`

The homepage will redirect to the waitlist page where users can join the waitlist for early access.

## Next Steps After Waitlist Phase

When you're ready to move past the waitlist phase:

1. Disable Waitlist mode in the Clerk Dashboard
2. Update the homepage in `app/page.tsx` to show your landing page instead of redirecting
3. Configure additional user authentication flows as needed 