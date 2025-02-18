import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { faHome } from "@fortawesome/free-solid-svg-icons";
export default function navbar({ username }) {
  return (
    <div className="h-5/6 w-1/4 rounded-xl border-gray-300 border">
      <div className="flex flex-col gap-64 ml-2">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2  mt-2 p-1 border-b">
            <div>
              <Image src="/notes.png" height={80} width={20} alt="Notes" />
            </div>
            <div>NoteBox</div>
          </div>
          <div className="flex gap-2 ml-2 mt-2 p-1">
            <div>
              <FontAwesomeIcon icon={faHome} className="text-black-500 w-4" />
            </div>
            <p className="text-sm">Home</p>
          </div>
          <div className="flex gap-2 ml-2 mt-2 p-1">
            <div>
              <FontAwesomeIcon icon={faStar} className="text-black-500 w-4" />
            </div>
            <p className="text-sm">Favourites</p>
          </div>
        </div>

        <div className="flex ml-2 gap-2">
          <div>
            <Image src="/note.png" height={80} width={20} alt="Notes" />
          </div>

          <p>{username}</p>
        </div>
      </div>
    </div>
  );
}
