"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// 1️⃣ Create Context
const AuthContext = createContext();

// 2️⃣ Create a Provider Component
export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();

  // Load user data from localStorage when app starts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      const storedUsername = localStorage.getItem("username");

      if (!storedToken || storedToken === "Invalid Token") {
        router.push("/login"); // Redirect to login if not authenticated
        return;
      }

      setToken(storedToken);
      setUsername(storedUsername);
    }
  }, []);
  //   useEffect(() => {
  //     console.log(token);
  //     console.log(username);
  //   }, [token, username]);
  return (
    <AuthContext.Provider value={{ username, setUsername, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3️⃣ Custom Hook to Use Context
export const useAuth = () => useContext(AuthContext);
