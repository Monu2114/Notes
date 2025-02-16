import { Card, CardContent } from "@/components/ui/card";
import { Play, FileText } from "lucide-react";
import { Button } from "./ui/button";
const NoteCard = ({ type, title, content, timestamp, duration, image }) => {
  return (
    <Card className="w-64 p-4 border shadow-sm h-60">
      <div className="text-gray-500 text-sm flex gap-10">
        <div>{timestamp}</div>
        <Button className="bg-slate-400 h-8">
          {type === "audio" ? duration : "Text"}
        </Button>
      </div>
      <div className="flex items-center gap-2 mt-2">
        {type === "audio" ? (
          <Play className="text-gray-700" />
        ) : (
          <FileText className="text-gray-700" />
        )}
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <CardContent className="mt-2 text-sm text-gray-700">
        {content}
        {type === "audio" && (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-gray-500">{duration}</span>
          </div>
        )}
        {image && <div className="mt-2 text-blue-500 text-sm">📷 {image}</div>}
      </CardContent>
    </Card>
  );
};

const NotesList = () => {
  const notes = [
    {
      type: "audio",
      title: "Engineering Assignment Audio",
      content:
        "I'm recording an audio to transcribe into text for the assignment of engineering.",
      timestamp: "Jan 30, 2025 • 5:26 PM",
      duration: "00:09",
      image: "1 Image",
    },
    {
      type: "text",
      title: "Random Sequence",
      content: "ssxscscscsc",
      timestamp: "Jan 30, 2025 • 5:21 PM",
    },
  ];

  return (
    <div className="flex gap-4 p-4">
      {notes.map((note, index) => (
        <NoteCard key={index} {...note} />
      ))}
    </div>
  );
};

export default NotesList;
