import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHome } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // Import Auth Context

export default function Navbar() {
  const router = useRouter();
  const { username } = useAuth(); // Get username from context

  return (
    <div className="h-5/6 w-1/3 rounded-xl border-gray-300 border cursor-pointer">
      <div className="flex flex-col gap-56 ml-2">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 mt-2 p-1 border-b">
            <Image src="/notes.png" height={80} width={20} alt="Notes" />
            <div>NoteBox</div>
          </div>
          <div
            className="flex gap-2 ml-2 mt-2 p-1 hover:bg-purple-400 hover:rounded-xl"
            onClick={() => router.push("/dashboard")}
          >
            <FontAwesomeIcon icon={faHome} className="text-black-500 w-4" />
            <p className="text-sm">Home</p>
          </div>
          <div
            className="flex gap-2 ml-2 mt-2 p-1 hover:bg-purple-400 hover:rounded-xl"
            onClick={() => router.push("/favourites")}
          >
            <FontAwesomeIcon icon={faStar} className="text-black-500 w-4 " />
            <p className="text-sm">Favourites</p>
          </div>
        </div>

        <div className="flex ml-2 gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>{username ? username : "Guest"}</p>{" "}
          {/* ✅ Username from Context */}
        </div>
      </div>
    </div>
  );
}
