"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Signup() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Dummy authentication (Replace with real auth logic)
    if (isLogin) {
      setUser({ name: data.username });
    } else {
      setUser({ name: data.username });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {user ? (
        <Card className="p-6 w-96 text-center">
          <h2 className="text-xl font-bold">Welcome, {user.name}!</h2>
          <Button className="mt-4 w-full" onClick={() => setUser(null)}>
            Logout
          </Button>
        </Card>
      ) : (
        <Card className="p-6 w-96">
          <h2 className="text-xl font-bold mb-4">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label>Username</Label>
              <Input name="username" required />
            </div>
            <div className="mb-4">
              <Label>Password</Label>
              <Input type="password" name="password" required />
            </div>
            <Button type="submit" className="w-full">
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={toggleForm} className="text-blue-500 underline">
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </Card>
      )}
    </div>
  );
}
