import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import { faImage, faStar, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
export default function textbar() {
  return (
    <div className="rounded-2xl p-2 w-full h-8 flex justify-between border ml-20">
      <div className="flex gap-4">
        <FontAwesomeIcon
          icon={faPen}
          size="3x"
          className="text-black-500 bg-gray-100 rounded-full w-3"
        />
        <FontAwesomeIcon
          icon={faImage}
          size="3x"
          className="text-black-500 bg-gray-100 rounded-full w-3"
        />
      </div>
      <div className="text-xs">
        <Button variant="destructive" className="h-6 p-2 w-24 rounded-2xl">
          start recording
        </Button>
      </div>
    </div>
  );
}
