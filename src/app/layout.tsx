/*
📌 What This File Does:
- This is the **root layout** of the app (wraps all pages).
- It ensures **every page** has access to:
  ✅ tRPC (for API communication)
  ✅ React Query (for API caching)
- The `<html>` and `<body>` tags are required in Next.js 14.
*/


"use client"; // Ensures this file runs as a Client Component in Next.js

// Import the tRPC client (for API communication in React)
import { trpc } from "@/utils/trpc";

// Import the HTTP link for making API requests
import { httpBatchLink } from "@trpc/client";

// Import React Query (used for caching and managing API requests)
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import useState (used for creating the QueryClient)
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  // Create a QueryClient instance (used to manage API data caching)
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body>
        {/* Provide tRPC and React Query to all components inside the app */}
        <trpc.Provider
          client={trpc.createClient({ links: [httpBatchLink({ url: "/api/trpc" })] })}
          queryClient={queryClient}
        >
          <QueryClientProvider client={queryClient}>
            {children} {/* Render the page content */}
          </QueryClientProvider>
        </trpc.Provider>
      </body>
    </html>
  );
}