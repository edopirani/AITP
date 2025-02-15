"use client";

/*
📌 What This File Does:
- Redirects users to `/auth` if not authenticated.
- Displays user trips and allows adding new ones.
*/

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAuthenticated, logoutUser } from "@/utils/auth";
import { trpc } from "@/utils/trpc";

export default function Page() {
  const router = useRouter();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth");
    }
  }, []);

  // Fetch trips for the logged-in user
  const { data: trips, isLoading } = trpc.getTripsByUser.useQuery({ userId }, { enabled: !!userId });

  return (
    <main className="p-6">
      <button onClick={logoutUser} className="bg-red-500 text-white p-2 mb-4">
        Logout
      </button>

      <h1 className="text-xl font-bold mb-4">Your Trips</h1>
      {isLoading && <p>Loading trips...</p>}
      {trips?.success && 'trips' in trips && trips.trips.length > 0 && trips.trips.map((trip) => (
        <p key={trip.id}>{trip.destination} ({trip.startDate} - {trip.endDate})</p>
      ))}
    </main>
  );
}