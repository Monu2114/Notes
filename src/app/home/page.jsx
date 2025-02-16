"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Textbar from "@/components/textbar";
import Search from "@/components/search";
import Note from "@/components/note";
import Login from "@/app/signup/page";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchNotes(storedToken);
      console.log(notes);
    }
  }, []);

  const fetchNotes = async (authToken) => {
    try {
      const res = await fetch("http://localhost:5000/notes", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.ok) {
        setNotes(data);
      } else {
        console.error("Failed to fetch notes:", data.error);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  return (
    <div className="ml-4 flex mt-4 h-screen w-screen gap-2">
      <Login setToken={setToken} fetchNotes={fetchNotes} />
      <Navbar />
      <div className="flex flex-col">
        <Search />
        <div className="flex flex-wrap gap-4">
          {notes.map((note) => (
            <Note
              key={note._id}
              title={note.title}
              content={note.content}
              timestamp={note.timestamp}
            />
          ))}
        </div>
        <Textbar />
      </div>
    </div>
  );
}
