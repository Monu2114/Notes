import { Card, CardContent } from "@/components/ui/card";
import { Play, FileText } from "lucide-react";
import { Button } from "./ui/button";
const NoteCard = ({ type, title, content, timestamp, duration }) => {
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
        {/* {image && <div className="mt-2 text-blue-500 text-sm">📷 {image}</div>} */}
      </CardContent>
    </Card>
  );
};

export default NoteCard;
