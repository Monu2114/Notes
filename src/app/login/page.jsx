"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const { setToken, setUsername } = useAuth(); // Make sure to have this

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        console.log("Hi");
        setUsername(username);
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username); // Save token to context
        router.push("/dashboard"); // Redirect to dashboard after login
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (error) {
      setError("Login failed. Try again.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsLogin(true);
      } else {
        setError(data.error || "Failed to sign up");
      }
    } catch (error) {
      setError("Sign-up failed. Try again");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">
        {isLogin ? "Login" : "Sign Up"} to AI Notes
      </h1>
      <form
        className="flex flex-col gap-3 w-80"
        onSubmit={isLogin ? handleLogin : handleSignUp}
      >
        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded"
          value={username}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <p className="mt-4">
        {isLogin ? "Not a user?" : "Already have an account?"}{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => {
            setError("");
            setIsLogin(!isLogin);
          }}
        >
          {isLogin ? "Sign Up" : "Login"}
        </span>
      </p>
    </div>
  );
}
