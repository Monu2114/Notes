"use client";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import Notes from "@/components/Notes";
export default function Favourites() {
  const [favourite, setFavourite] = useState([]);
  const [token, setToken] = useState("");
  const [isMounted, setMount] = useState(false);

  const fetchNotes = async (token) => {
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
  if (!isMounted) return false;
  useEffect(() => {
    if (!isMounted) return;
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      const storedUsername = localStorage.getItem("username");

      if (storedToken == "Invalid Token" || !storedUsername) {
        router.push("/login"); // Redirect if not logged in
        return;
      }
      setToken(storedToken);
      fetchNotes(storedToken);
    }
  }, []);
  return (
    <div>
      {" "}
      <Navbar />
      {favourite && <Notes notes={favourite} />}
    </div>
  );
}
