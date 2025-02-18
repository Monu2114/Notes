"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
export default function Speech({ token, setTranscription }) {
  const router = useRouter();

  const [record, setRecord] = useState("Start");
  const [recognition, setRecognition] = useState(null);
  const [transcript, setTranscript] = useState(""); // State to store the transcription
  const [error, setError] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.continuous = true;
        recog.interimResults = true;
        recog.lang = "en-US";
        setRecognition(recog);
      } else {
        console.error("Speech recognition not supported in this browser.");
      }
    }
  }, []);

  useEffect(() => {
    if (!recognition) return;

    // Transcribing the speech
    const handleResult = (event) => {
      let newTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        newTranscript += event.results[i][0].transcript;
        setTranscription(newTranscript);
      }
      setTranscript(newTranscript); // Update transcript state
      console.log("Transcribed Text: ", newTranscript);
    };

    const handleEnd = () => {
      // Send to the backend only when the recognition ends
      sendToBackend(transcript);
    };

    recognition.addEventListener("result", handleResult);
    recognition.addEventListener("end", handleEnd);

    return () => {
      recognition.removeEventListener("result", handleResult);
      recognition.removeEventListener("end", handleEnd);
    };
  }, [recognition, transcript]);

  function recordSet() {
    if (!recognition) return;
    if (record === "Start") {
      recognition.start();
      setRecord("Stop");
    } else {
      recognition.stop();
      setRecord("Start");
    }
  }

  async function sendToBackend(transcript) {
    if (!transcript) {
      setError("Record something");
      console.error("No text received");
      return;
    }
    try {
      const res = await fetch(
        "http://localhost:5000/notes/save-transcription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ transcribedText: transcript }),
        }
      );

      if (!res.ok) {
        setError("Record something");

        console.error("Failed to send to backend. Status:", res.status);
        return;
      }

      const data = await res.json();
      console.log("Backend response:", data);
      router.push("/dashboard");
    } catch (error) {
      setError("Record something");

      console.error("Error sending data to backend:", error);
    }
  }

  return (
    <div>
      {error && (
        <div className="mt-4 p-2 text-red-600 bg-red-100 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}
      <Button
        variant="destructive"
        className="h-6 p-2 w-24 rounded-2xl"
        onClick={recordSet}
      >
        {`${record} recording`}
      </Button>
    </div>
  );
}
