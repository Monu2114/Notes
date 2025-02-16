"use client";
import Navbar from "@/components/navbar";
import Textbar from "@/components/textbar";
import Search from "@/components/search";
import Note from "@/components/note";
import Login from "@/app/login/page";
import { use, useState } from "react";
import Fetch from "@/components/fetchdata";
import Notes from "@/components/Notes";
export default function Home() {
  const [token, setToken] = useState(null);
  const [notes, fetchNotes] = useState(null);
  return (
    <div className="ml-4 flex mt-4 h-screen w-screen gap-2">
      <Login setToken={setToken} fetchNotes={fetchNotes} />
      <Notes notes={notes} />
      {/* <Fetch token={token} fetchNotes={fetchNotes} /> */}
      {console.log(token)}
      {console.log(notes)}
    </div>
  );
}
