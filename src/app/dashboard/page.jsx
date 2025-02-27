"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Textbar from "@/components/textbar";
import Search from "@/components/search";
import Notes from "@/components/Notes";
import { useAuth } from "@/context/AuthContext";
export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  // const [username, setUsername] = useState("");
  // const [isMounted, setMount] = useState(false);
  const { username, token } = useAuth();
  const router = useRouter();
  const fetchNotes = async (token) => {
    try {
      const res = await fetch("http://localhost:5000/notes", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) setNotes(data);
      else {
        console.error("Failed to fetch notes:", data.error);
        router.push("/login");
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
  useEffect(() => {
    // setMount(true);
    // if (typeof window !== "undefined") {
    //   const storedToken = localStorage.getItem("token");
    //   const storedUsername = localStorage.getItem("username");
    //   console.log("Token from storage:", storedToken);
    //   if (!storedToken || !storedUsername || storedToken == "Invalid token.") {
    //     router.push("/login"); // Redirect if not logged in
    //     return;
    //   }

    //   setUsername(storedUsername);
    //
    // }
    if (!token || token == "Invalid Token.") router.push("/login");
    fetchNotes(token);
  }, [router]);

  // if (!isMounted) {
  //   return null; // Optionally, you could render a loading spinner here
  // }

  return (
    <div className="ml-4 flex mt-4 h-screen w-screen gap-2">
      <Navbar />
      <div className="flex flex-col gap-10">
        <Search />
        <div className="flex flex-wrap gap-4">
          <Notes notes={notes} />
        </div>
        <Textbar />
      </div>
    </div>
  );
}
