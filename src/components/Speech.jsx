"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

export default function Speech({ token, setTranscription }) {
  const [record, setRecord] = useState("Start");
  const [recognition, setRecognition] = useState(null);

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
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setTranscription(transcript);
      console.log("Transcribed Text: ", transcript);
      sendToBackend(transcript);
    };

    recognition.addEventListener("result", handleResult);

    return () => {
      recognition.removeEventListener("result", handleResult);
    };
  }, [recognition]);

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
    try {
      const res = await fetch(
        "http://localhost:5000/notes/save-transcription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: transcript }),
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  }

  return (
    <div>
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
