"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Textbar from "@/components/textbar";
import Search from "@/components/search";
import Note from "@/components/note";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [username, setUsername] = useState("");
  const [isMounted, setMount] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMount(true);
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      const storedUsername = localStorage.getItem("username");

      if (!storedToken || !storedUsername) {
        router.push("/login"); // Redirect if not logged in
        return;
      }

      setUsername(storedUsername);
      fetchNotes(storedToken);
    }
  }, [router]);

  const fetchNotes = async (token) => {
    try {
      const res = await fetch("http://localhost:5000/notes", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) setNotes(data);
      else console.error("Failed to fetch notes:", data.error);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
  if (!isMounted) {
    return null; // Optionally, you could render a loading spinner here
  }

  return (
    <div className="ml-4 flex mt-4 h-screen w-screen gap-2">
      <Navbar username={username} />
      <div className="flex flex-col">
        <Search />
        <div className="flex flex-wrap gap-4">
          {notes.length > 0 ? (
            notes.map((note) => (
              <Note
                key={note._id}
                title={note.title}
                content={note.content}
                timestamp={note.timestamp}
              />
            ))
          ) : (
            <p>No notes found.</p>
          )}
        </div>
        <Textbar token={localStorage.getItem("token")} />
      </div>
    </div>
  );
}
