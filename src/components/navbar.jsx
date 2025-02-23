import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Favourites from "@/app/favourites/page";
import { useRouter } from "next/navigation";

export default function navbar({ username }) {
  let router = useRouter();
  return (
    <div className="h-5/6 w-1/3 rounded-xl border-gray-300 border  cursor-pointer">
      <div className="flex flex-col gap-56 ml-2">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2  mt-2 p-1 border-b ">
            <div>
              <Image src="/notes.png" height={80} width={20} alt="Notes" />
            </div>
            <div>NoteBox</div>
          </div>
          <div className="flex gap-2 ml-2 mt-2 p-1 hover:bg-purple-400 hover:rounded-xl">
            <div>
              <FontAwesomeIcon icon={faHome} className="text-black-500 w-4" />
            </div>
            <p className="text-sm">Home</p>
          </div>
          <div
            className="flex gap-2 ml-2 mt-2 p-1 "
            onClick={() => router.push("/favourites")}
          >
            <div>
              <FontAwesomeIcon icon={faStar} className="text-black-500 w-4" />
            </div>
            <p className="text-sm">Favourites</p>
          </div>
        </div>

        <div className="flex ml-2 gap-2">
          <div className="">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <p>{username}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
