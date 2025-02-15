"use client";

/*
What This File Does:
- This is the dashboard page (`localhost:3000/dashboard`).
- It allows users to create and view planned trips.
- Users must be logged in to interact with trips.
- Users can log out by clicking the "Logout" button.

Why Use `localStorage` for Authentication?
- JWT tokens are stored in local storage to persist sessions.
- Logging out removes the token and redirects the user.

Why Use `useEffect` for Authentication Check?
- Ensures the user is redirected if they are not logged in.
*/

import { trpc } from "@/utils/trpc";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Trip = {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
};

export default function Dashboard() {
  const router = useRouter();

  // State for authentication
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  // State for trip creation
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch all trips for the logged-in user
  const { data: trips, isLoading: isLoadingTrips } = trpc.getTripsByUser.useQuery(
    { userId },
    { enabled: !!userId }
  );

  // Create a new trip
  const createTrip = trpc.createTrip.useMutation({
    onSuccess: () => {
      alert("Trip added! Refresh to see changes.");
    },
  });

  // Check if the user is logged in
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("token");

    if (!storedUserId || !storedToken) {
      router.push("/auth"); // Redirect to login page if not authenticated
    } else {
      setUserId(storedUserId);
      setToken(storedToken);
    }
  }, [router]);

  // Logout Function: Clears local storage and redirects to login
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    router.push("/auth"); // Redirect back to login
  };

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Trip Planner</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      {/* Display Loading State */}
      {isLoadingTrips && <p>Loading trips...</p>}

      {/* Display Trips */}
      {trips && 'trips' in trips && trips.trips.map((trip: Trip) => (
        <p key={trip.id}>
          {trip.destination} ({trip.startDate} - {trip.endDate})
        </p>
      ))}

      {/* Form to Add a New Trip */}
      <div className="mt-6">
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={() => {
            if (!userId) {
              alert("You must be logged in to add a trip.");
              return;
            }
            createTrip.mutate({ userId, destination, startDate, endDate });
          }}
          className="bg-blue-500 text-white p-2"
        >
          Add Trip
        </button>
      </div>
    </main>
  );
}