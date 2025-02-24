import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Import useRouter

const CreateForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [favourite, setFav] = useState(false);
  const [token, setToken] = useState("");

  const router = useRouter(); // ✅ Initialize useRouter

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      const storedUsername = localStorage.getItem("username");

      if (!storedToken || !storedUsername || storedToken == "Invalid token.") {
        router.push("/login"); // ✅ Redirect if user is not logged in
        return;
      }
      setToken(storedToken);
    }
  }, []); // ✅ Runs once when component mounts

  const sendNote = async (e) => {
    e.preventDefault(); // ✅ Prevents default form submission

    try {
      const res = await fetch("http://localhost:5000/notes/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, favourite }), // ✅ Send form data
      });

      const data = await res.json();
      console.log("Response:", data);
    } catch (err) {
      console.log(err); // ✅ Fix console.log
    }
  };

  return (
    <div>
      <form onSubmit={sendNote}>
        {" "}
        {/* ✅ Fixed form submission */}
        <label htmlFor="title">Title :</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="content">Content :</label>
        <input
          id="content"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <label htmlFor="fav">Favourite</label>
        <input
          id="fav"
          type="checkbox"
          checked={setFav(true)}
          onChange={(e) => setFav(e.target.checked)} // ✅ Fixed checkbox state
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CreateForm;
