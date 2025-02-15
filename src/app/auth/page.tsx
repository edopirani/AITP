"use client";

/*
What This File Does:
- This is the authentication page (`localhost:3000/auth`).
- It allows users to **toggle** between login and registration.
- Users can log in using **either** their email or username.
- Successful login stores a token and redirects to `/dashboard`.
*/

import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  // Toggle between login and register forms
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Login state
  const [identifier, setIdentifier] = useState(""); // Accepts either email or username
  const [password, setPassword] = useState("");

  // Register state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  // Login Mutation
  const login = trpc.login.useMutation({
    onSuccess: (data) => {
      if ('token' in data && 'user' in data) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.userId);
        router.push("/dashboard"); // Redirect to dashboard after login
      } else {
        setErrorMessage("Unexpected response format");
      }
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  // Register Mutation
  const register = trpc.register.useMutation({
    onSuccess: (data) => {
      if ('token' in data && 'user' in data) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.userId);
        router.push("/dashboard"); // Redirect to dashboard after registration
      } else {
        setErrorMessage("Unexpected response format");
      }
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">{isLogin ? "Login" : "Register"}</h1>

      {/* Show Error Messages */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {isLogin ? (
        // Login Form
        <>
          <input
            type="text"
            placeholder="Username or Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <button
            onClick={() => login.mutate({ identifier, password })}
            className="bg-blue-500 text-white p-2 w-full"
          >
            Login
          </button>
        </>
      ) : (
        // Register Form
        <>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <button
            onClick={() => register.mutate({ username, email, password: registerPassword })}
            className="bg-green-500 text-white p-2 w-full"
          >
            Register
          </button>
        </>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => {
          setIsLogin(!isLogin);
          setErrorMessage(""); // Clear any previous error messages
        }}
        className="mt-4 text-blue-500 w-full"
      >
        {isLogin ? "Don't have an account? Register here" : "Already have an account? Login here"}
      </button>
    </main>
  );
}