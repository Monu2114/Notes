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
      else {
        router.push("/login");
        // console.error("Failed to fetch notes:", data.error);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    if (!token) return; // Ensure token exists before fetching
    fetchNotes();
  }, [token]); // Re-fetch if token changes

  return (
    <div className="flex mt-4 gap-20">
      <Navbar />
      {favourite && <Notes notes={favourite} />}
    </div>
  );
}
