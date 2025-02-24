"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPen } from "@fortawesome/free-solid-svg-icons";
import Speech from "./Speech";
import CreateForm from "./createform";
export default function Textbar({ token }) {
  const [transcript, setTranscription] = useState("");
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="rounded-2xl p-2 w-2/3 h-8 flex justify-between border ml-20">
      <div className="flex items-center gap-1">
        <div className="bg-gray-100 p-2 rounded-full h-6">
          <FontAwesomeIcon
            icon={faPen}
            size="xs"
            className="text-black-500 mb-2"
            onClick={() => setShowForm(true)}
          />
        </div>
        <div className="bg-gray-100 p-2 rounded-full h-6">
          <FontAwesomeIcon
            icon={faImage}
            size="xs"
            className="text-black-500 mb-2"
          />
        </div>
        <div>{transcript}</div>
      </div>
      <div className="text-xs">
        <Speech token={token} setTranscription={setTranscription} />
      </div>
      {showForm && (
        <div className="absolute top-20 left-1/3 bg-white p-4 rounded-lg shadow-lg">
          <CreateForm />
          <button
            onClick={() => setShowForm(false)}
            className="mt-2 p-1 bg-red-500 text-white rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
