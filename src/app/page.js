// "use client";
// import { useEffect, useState } from "react";
// import Navbar from "@/components/navbar";
// import Textbar from "@/components/textbar";
// import Search from "@/components/search";
// import Note from "@/components/note";
// import Login from "@/app/login/page";

// export default function Home() {
//   const [notes, setNotes] = useState([]);
//   const [token, setToken] = useState("");
//   const [isLogin, setLogin] = useState(false);
//   const [username, setName] = useState("");

//   const fetchNotes = async (authToken) => {
//     try {
//       const res = await fetch("http://localhost:5000/notes", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//           "Content-Type": "application/json",
//         },
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setNotes(data);
//       } else {
//         console.error("Failed to fetch notes:", data.error);
//       }
//     } catch (error) {
//       console.error("Error fetching notes:", error);
//     }
//   };
//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     const storedUsername = localStorage.getItem("username");

//     if (storedToken && storedUsername) {
//       setToken(storedToken);
//       setName(storedUsername);
//       setLogin(true);
//       fetchNotes(storedToken);
//     }
//   }, []); // Runs only once when the component mounts

//   return (
//     <div className="ml-4 flex mt-4 h-screen w-screen gap-2">
//       {!isLogin ? (
//         <Login setToken={setToken} setLogin={setLogin} setName={setName} />
//       ) : (
//         <>
//           <Navbar username={username} />
//           <div className="flex flex-col">
//             <Search />
//             <div className="flex flex-wrap gap-4">
//               {notes.length > 0 ? (
//                 notes.map((note) => (
//                   <Note
//                     key={note._id}
//                     title={note.title}
//                     content={note.content}
//                     timestamp={note.timestamp}
//                   />
//                 ))
//               ) : (
//                 <p>No notes found.</p>
//               )}
//             </div>
//             <Textbar token={token} />
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">AI Notes</h1>
      <button
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={() => router.push("/login")}
      >
        Login
      </button>
    </div>
  );
}
