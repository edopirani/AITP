"use client";

/*
What This File Does:
- This is the authentication page (`localhost:3000/auth`).
- It allows users to **toggle** between login and registration.
- Users can log in using **either** their email or username.
- Successful login stores a token and redirects to `/dashboard`.
*/

import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null); // Store error messages
  const [validationErrors, setValidationErrors] = useState<string[]>([]); // Store validation errors
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/register

  const loginMutation = trpc.login.useMutation({
    onSuccess: (data) => {
      if (!data.success) {
        if ('message' in data) {
          setError(data.message); // Show error message if login fails
        }
        return;
      }
      if ('token' in data && data.token) {
        localStorage.setItem("token", data.token);
        if ('user' in data && data.user) {
          localStorage.setItem("userId", data.user.userId);
        }
      }
      router.push("/dashboard");
    },
    onError: (error) => {
      handleValidationErrors(error);
    },
  });

  const registerMutation = trpc.register.useMutation({
    onSuccess: (data) => {
      if (!data.success) {
        if ('message' in data) {
          setError(data.message); // Show error message if registration fails
        }
        return;
      }
      if ('token' in data && data.token) {
        localStorage.setItem("token", data.token);
      }
      if ('user' in data && data.user) {
        localStorage.setItem("userId", data.user.userId);
      }
      router.push("/dashboard");
    },
    onError: (error) => {
      handleValidationErrors(error);
    },
  });

  // Handle validation errors from tRPC
  const handleValidationErrors = (error: any) => {
    setError(null); // Reset general error
    setValidationErrors([]); // Reset validation errors

    if (error?.data?.zodError?.fieldErrors) {
      // Extract validation errors from Zod
      const extractedErrors = Object.entries(error.data.zodError.fieldErrors).map(
        ([field, messages]: [string, unknown]) => `${field}: ${(messages as string[])?.[0]}`
      );
      setValidationErrors(extractedErrors);
    } else {
      setError("An unexpected error occurred.");
    }
  };

  const handleSubmit = () => {
    setError(null); // Clear previous general errors
    setValidationErrors([]); // Clear previous validation errors

    if (isLogin) {
      loginMutation.mutate({ identifier, password });
    } else {
      if (!email || !username) {
        setError("Username and Email are required.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }
      registerMutation.mutate({ username, email, password });
    }
  };

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">{isLogin ? "Login" : "Register"}</h1>

      {/* Display General Error Messages */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="text-red-500 mb-2">
          {validationErrors.map((err, index) => (
            <p key={index}>{err}</p>
          ))}
        </div>
      )}

      {!isLogin && (
        <>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
        </>
      )}

      {isLogin && (
        <input
          type="text"
          placeholder="Email or Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
      )}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-2 w-full"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white p-2 w-full"
      >
        {isLogin ? "Login" : "Register"}
      </button>

      <p className="mt-4 text-center">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button onClick={() => setIsLogin(!isLogin)} className="text-blue-500">
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </main>
  );
}