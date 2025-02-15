/*
📌 What This File Does:
- This file creates the tRPC client for the frontend.
- It allows React components to call backend API routes easily.
- It imports the backend API types (`AppRouter`) to ensure type safety.

💡 Why Use tRPC on the Frontend?
- Instead of manually writing API fetch calls (`fetch('/api/...')`), we can use tRPC hooks.
- This keeps the API fully **type-safe**—React knows which endpoints exist and what data they return.
- It automatically updates data when the backend changes, reducing errors.
*/

// Import the tRPC client for React
import { createTRPCReact } from "@trpc/react-query";

// Import backend API types
import type { AppRouter } from "@/server/trpc";

// Create a tRPC client for the frontend
export const trpc = createTRPCReact<AppRouter>();
