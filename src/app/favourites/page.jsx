"use client";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import Notes from "@/components/Notes";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // Import Context

export default function Favourites() {
  const [favourite, setFavourite] = useState([]);
  const { token, username } = useAuth(); // ✅ Get token and username from Context
  const router = useRouter();

  const fetchNotes = async () => {
    try {
      const res = await fetch("http://localhost:5000/notes/favourite", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) setFavourite(data);
      else console.error("Failed to fetch notes:", data.error);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    if (!token) return; // Ensure token exists before fetching
    fetchNotes();
  }, [token]); // Re-fetch if token changes

  return (
    <div>
      <Navbar />
      <h1 className="text-xl font-bold">Welcome, {username}!</h1>{" "}
      {/* ✅ Display username */}
      {favourite && <Notes notes={favourite} />}
    </div>
  );
}
