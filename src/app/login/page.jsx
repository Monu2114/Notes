"use client";
import { useState } from "react";

export default function Login({ setToken, fetchNotes }) {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");

  const fetchData = async (token) => {
    try {
      const res = await fetch("http://localhost:5000/notes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      fetchNotes(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending login request...", username, password);
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        const token = data.token;
        setToken(token);
        fetchData(token);

        // Fetch notes immediately after login
      } else {
        console.error("Login failed:", data.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
