"use client";
import { Card, CardContent } from "@/components/ui/card";
import { MoreHorizontal, Copy } from "lucide-react";
import { useState } from "react";

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const NoteCard = ({ title, content, timestamp }) => {
  const formattedDate = formatDate(timestamp);
  const [copied, setCopied] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setShowNotification(true);
      // Reset states after 2 seconds
      setTimeout(() => {
        setCopied(false);
        setShowNotification(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Card className="w-64 h-32 p-4 border shadow-sm bg-white hover:shadow-md transition-shadow relative">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">{formattedDate}</span>
          </div>
          <h3 className="text-sm mt-2 font-semibold text-gray-700 line-clamp-1">
            {title}
          </h3>
        </div>
      </div>
      <CardContent className="p-0 mt-2">
        <p className="text-sm text-gray-500 line-clamp-2">{content}</p>
      </CardContent>
      <div className="flex justify-end gap-1">
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>

        <div className="relative">
          <button
            onClick={handleCopy}
            className={`text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100`}
          >
            <Copy className="w-4 h-4" />
          </button>

          {showNotification && (
            <div className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-lg whitespace-nowrap">
              Copied to clipboard!
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default NoteCard;
